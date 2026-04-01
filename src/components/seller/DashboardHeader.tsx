"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, Bell, ShoppingCart, MessageSquare, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	getMyNotifications,
	getSellerOrderSummary,
	markMyNotificationAsRead,
	type UserNotification,
} from "@/lib/seller";
import { getUnreadMessagesCount } from "@/lib/messages";

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

	return `Il y a ${Math.floor(diffHours / 24)} j`;
}

export function DashboardHeader() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [notifications, setNotifications] = useState<UserNotification[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [pendingOrders, setPendingOrders] = useState(0);
	const [unreadMessages, setUnreadMessages] = useState(0);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationsRef = useRef<HTMLDivElement>(null);

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
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

		async function loadHeaderData() {
			try {
				const [notificationsData, summary, msgCount] = await Promise.all([
					getMyNotifications(8),
					getSellerOrderSummary(),
					getUnreadMessagesCount(),
				]);

				if (!isMounted) {
					return;
				}

				setNotifications(notificationsData.notifications);
				setUnreadCount(notificationsData.unreadCount);
				setPendingOrders(summary.pendingOrders);
				setUnreadMessages(msgCount);
			} catch {
				// Keep header interactive even if API data is unavailable.
			}
		}

		loadHeaderData();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		const stream = new EventSource(`${API_BASE_URL}/notifications/stream`, {
			withCredentials: true,
		});

		function handleNotification(event: MessageEvent<string>) {
			try {
				const payload = JSON.parse(event.data) as {
					notification?: UserNotification;
				};

				if (!payload.notification) {
					return;
				}

				setNotifications((current) => [payload.notification!, ...current].slice(0, 8));
				setUnreadCount((current) => current + 1);
				setPendingOrders((current) => current + 1);
			} catch {
				// Ignore malformed stream payloads.
			}
		}

		stream.addEventListener("notification", handleNotification as EventListener);

		return () => {
			stream.removeEventListener("notification", handleNotification as EventListener);
			stream.close();
		};
	}, []);

	async function handleNotificationClick(notification: UserNotification) {
		if (!notification.isRead) {
			try {
				await markMyNotificationAsRead(notification._id);
				setNotifications((current) =>
					current.map((item) =>
						item._id === notification._id ? { ...item, isRead: true } : item,
					),
				);
				setUnreadCount((current) => Math.max(0, current - 1));
			} catch {
				// Ignore failures.
			}
		}

		setShowNotifications(false);
	}

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
			<div className="flex items-center justify-between px-6 py-4">
				{/* Search Bar */}
				<div className="flex-1 max-w-xl">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder="Rechercher un produit ou un acheteur..."
							className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
						/>
					</div>
				</div>

				{/* Actions */}
				<div className="flex items-center gap-4 ml-6">
					{/* Notifications */}
					<div className="relative" ref={notificationsRef}>
						<button
							type="button"
							onClick={() => setShowNotifications((current) => !current)}
							className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<Bell className="w-5 h-5" />
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
									{unreadCount > 99 ? "99+" : unreadCount}
								</span>
							)}
						</button>

						{showNotifications && (
							<div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
								<div className="px-4 py-2 border-b border-gray-100">
									<p className="text-sm font-semibold text-gray-900">Notifications</p>
									<p className="text-xs text-gray-500">
										{unreadCount} non lue{unreadCount > 1 ? "s" : ""}
									</p>
								</div>
								<div className="max-h-96 overflow-y-auto">
									{notifications.length === 0 ? (
										<p className="px-4 py-6 text-sm text-gray-500 text-center">
											Aucune notification.
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
												<p className="text-sm font-semibold text-gray-900">
													{notification.title}
												</p>
												<p className="text-xs text-gray-600 mt-1">
													{notification.message}
												</p>
												<p className="text-[11px] text-gray-400 mt-2">
													{formatRelativeDate(notification.createdAt)}
												</p>
											</button>
										))
									)}
								</div>
							</div>
						)}
					</div>

					<Link
						href="/seller/messages"
						className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						title="Messages"
					>
						<MessageSquare className="w-5 h-5" />
						{unreadMessages > 0 && (
							<span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
								{unreadMessages > 99 ? "99+" : unreadMessages}
							</span>
						)}
					</Link>

					<button
						type="button"
						className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						title="Commandes en attente"
					>
						<ShoppingCart className="w-5 h-5" />
						<span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
							{pendingOrders > 99 ? "99+" : pendingOrders}
						</span>
					</button>

					{/* User Profile */}
					<div className="flex items-center gap-3 pl-4 border-l border-gray-200">
						<div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold">
							{user?.fullName?.charAt(0).toUpperCase()}
						</div>
						<Button
							onClick={handleLogout}
							variant="ghost"
							size="sm"
							className="text-gray-600 hover:text-gray-900"
						>
							<LogOut className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
