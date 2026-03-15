"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, Bell, ShoppingCart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};

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
					<button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
						<Bell className="w-5 h-5" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>

					{/* Cart */}
					<button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
						<ShoppingCart className="w-5 h-5" />
						<span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
							3
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
