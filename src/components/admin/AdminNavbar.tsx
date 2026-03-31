"use client";

import {
	Search,
	Bell,
	Moon,
	Sun,
	ChevronDown,
	User,
	LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
	getAdminNotifications,
	markAdminNotificationAsRead,
	type AdminNotification,
} from "@/lib/admin";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "http://localhost:8000/api";

function formatRelativeDate(value: string) {
	const timestamp = new Date(value).getTime();
	if (Number.isNaN(timestamp)) {
		return "";
	}

	const diffMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
	if (diffMinutes < 1) return "A l'instant";
	if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;

	const diffHours = Math.floor(diffMinutes / 60);
	if (diffHours < 24) return `Il y a ${diffHours} h`;

	const diffDays = Math.floor(diffHours / 24);
	return `Il y a ${diffDays} j`;
}

export function AdminNavbar() {
	const [darkMode, setDarkMode] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [notifications, setNotifications] = useState<AdminNotification[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const menuRef = useRef<HTMLDivElement>(null);
	const notificationsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { user, logout } = useAuth();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowProfileMenu(false);
			}

			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target as Node)
			) {
				setShowNotifications(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		let isMounted = true;

		async function loadNotifications() {
			try {
				const data = await getAdminNotifications(8);
				if (isMounted) {
					setNotifications(data.notifications);
					setUnreadCount(data.unreadCount);
				}
			} catch {
				// Keep navbar usable even if notifications are unavailable.
			}
		}

		loadNotifications();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		const stream = new EventSource(`${API_BASE_URL}/notifications/admin/stream`, {
			withCredentials: true,
		});

		function handleNotification(event: MessageEvent<string>) {
			try {
				const payload = JSON.parse(event.data) as {
					notification?: AdminNotification & {
						checkoutReference?: string;
						totalPrice?: number;
						itemCount?: number;
						status?: string;
					};
				};

				if (!payload.notification) {
					return;
				}

				const nextNotification: AdminNotification = {
					_id: payload.notification._id,
					type: payload.notification.type,
					title: payload.notification.title,
					message: payload.notification.message,
					order: payload.notification.order,
					isRead: payload.notification.isRead,
					createdAt: payload.notification.createdAt,
					metadata: {
						checkoutReference: payload.notification.checkoutReference,
						totalPrice: payload.notification.totalPrice,
						itemCount: payload.notification.itemCount,
						status: payload.notification.status,
					},
				};

				setNotifications((current) => [nextNotification, ...current].slice(0, 8));
				setUnreadCount((current) => current + 1);
			} catch {
				// Ignore malformed stream messages.
			}
		}

		stream.addEventListener("notification", handleNotification as EventListener);

		return () => {
			stream.removeEventListener("notification", handleNotification as EventListener);
			stream.close();
		};
	}, []);

	async function handleLogout() {
		await logout();
		router.push("/login");
	}

	async function handleNotificationClick(notification: AdminNotification) {
		if (!notification.isRead) {
			try {
				await markAdminNotificationAsRead(notification._id);
				setNotifications((current) =>
					current.map((item) =>
						item._id === notification._id ? { ...item, isRead: true } : item,
					),
				);
				setUnreadCount((current) => Math.max(0, current - 1));
			} catch {
				// Ignore read acknowledgement failures.
			}
		}

		setShowNotifications(false);
		if (notification.order) {
			router.push("/agro-admin/agro-orders");
		}
	}

	return (
		<header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
			{/* Search */}
			<div className="relative w-full max-w-md">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<input
					type="text"
					placeholder="Search users, products, orders..."
					className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
				/>
			</div>

			{/* Right Actions */}
			<div className="flex items-center gap-4 ml-4">
				{/* Dark Mode Toggle */}
				<button
					type="button"
					onClick={() => setDarkMode(!darkMode)}
					className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
				>
					{darkMode ? (
						<Sun className="w-5 h-5" />
					) : (
						<Moon className="w-5 h-5" />
					)}
				</button>

				{/* Notifications */}
				<div className="relative" ref={notificationsRef}>
					<button
						type="button"
						onClick={() => setShowNotifications((current) => !current)}
						className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
					>
						<Bell className="w-5 h-5" />
						{unreadCount > 0 && (
							<span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
								{unreadCount > 99 ? "99+" : unreadCount}
							</span>
						)}
					</button>

					{showNotifications && (
						<div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
							<div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
								<div>
									<p className="text-sm font-semibold text-brand-dark">Notifications</p>
									<p className="text-xs text-gray-500">
										{unreadCount} non lue{unreadCount > 1 ? "s" : ""}
									</p>
								</div>
							</div>

							<div className="max-h-96 overflow-y-auto">
								{notifications.length === 0 ? (
									<p className="px-4 py-6 text-sm text-gray-500 text-center">
										Aucune notification pour le moment.
									</p>
								) : (
									notifications.map((notification) => (
										<button
											key={notification._id}
											type="button"
											onClick={() => handleNotificationClick(notification)}
											className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 ${
												notification.isRead ? "bg-white" : "bg-emerald-50/60"
											}`}
										>
											<div className="flex items-start justify-between gap-3">
												<div>
													<p className="text-sm font-semibold text-brand-dark">
														{notification.title}
													</p>
													<p className="text-xs text-gray-600 mt-1">
														{notification.message}
													</p>
												</div>
												<span className="text-[11px] text-gray-400 whitespace-nowrap">
													{formatRelativeDate(notification.createdAt)}
												</span>
											</div>
										</button>
									))
								)}
							</div>
						</div>
					)}
				</div>

				{/* Divider */}
				<div className="h-8 w-px bg-gray-200" />

				{/* Admin Profile with Dropdown */}
				<div className="relative" ref={menuRef}>
					<button
						type="button"
						onClick={() => setShowProfileMenu(!showProfileMenu)}
						className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
					>
						<div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-semibold text-sm">
							{user?.fullName?.charAt(0).toUpperCase() ?? "A"}
						</div>
						<div className="hidden sm:block text-left">
							<p className="text-sm font-semibold text-brand-dark leading-tight">
								{user?.fullName ?? "Admin User"}
							</p>
							<p className="text-xs text-gray-500 leading-tight">
								{user?.role === "admin" ? "Administrator" : "Compte"}
							</p>
						</div>
						<ChevronDown
							className={`w-4 h-4 text-gray-400 hidden sm:block transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
						/>
					</button>

					{/* Dropdown Menu */}
					{showProfileMenu && (
						<div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
							<Link
								href="/agro-admin/agro-settings"
								onClick={() => setShowProfileMenu(false)}
								className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								<User className="w-4 h-4 text-gray-400" />
								<span>Profile Settings</span>
							</Link>
							<div className="h-px bg-gray-100 my-1" />
							<button
								type="button"
								onClick={async () => {
									setShowProfileMenu(false);
									await handleLogout();
								}}
								className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
							>
								<LogOut className="w-4 h-4" />
								<span>Logout</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
