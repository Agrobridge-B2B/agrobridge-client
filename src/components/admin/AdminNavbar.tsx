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

export function AdminNavbar() {
	const [darkMode, setDarkMode] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowProfileMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

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
				<button
					type="button"
					className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
				>
					<Bell className="w-5 h-5" />
					<span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
						3
					</span>
				</button>

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
							A
						</div>
						<div className="hidden sm:block text-left">
							<p className="text-sm font-semibold text-brand-dark leading-tight">
								Admin User
							</p>
							<p className="text-xs text-gray-500 leading-tight">
								Administrator
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
								onClick={() => {
									setShowProfileMenu(false);
									// Add logout logic here
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
