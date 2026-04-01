"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, User, ShoppingCart, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getUnreadMessagesCount } from "@/lib/messages";
import { PRODUCT_CATEGORIES } from "@/lib/validations/product";

export function BuyerNavbar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user, isAuthenticated } = useAuth();
	const { itemCount, isReady } = useCart();

	const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
	const [categoryValue, setCategoryValue] = useState(searchParams.get("category") ?? "");
	const [unreadMessages, setUnreadMessages] = useState(0);

	// Fetch unread count on mount + poll every 15s so the badge stays live
	useEffect(() => {
		if (!isAuthenticated) return;

		let isMounted = true;

		async function loadUnread() {
			try {
				const count = await getUnreadMessagesCount();
				if (isMounted) setUnreadMessages(count);
			} catch {
				// Keep navbar usable even if the count fails to load
			}
		}

		loadUnread();
		const interval = setInterval(loadUnread, 15_000);

		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, [isAuthenticated]);

	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchValue.trim()) params.set("search", searchValue.trim());
		if (categoryValue) params.set("category", categoryValue);
		router.push(`/buyer/products?${params.toString()}`);
	}

	function handleCategoryChange(value: string) {
		setCategoryValue(value);
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set("category", value);
		} else {
			params.delete("category");
		}
		params.delete("page");
		router.push(`/buyer/products?${params.toString()}`);
	}

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 gap-4">
					{/* Logo */}
					<Link href="/buyer/products" className="shrink-0">
						<Image
							src="/logo/agrobridge-01.svg"
							alt="Agrobridge"
							width={40}
							height={40}
							priority
						/>
					</Link>

					{/* Search Bar */}
					<form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center gap-0">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder="Rechercher un produit..."
								className="w-full h-10 pl-9 pr-4 border border-gray-300 border-r-0 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
							/>
						</div>
						<select
							value={categoryValue}
							onChange={(e) => handleCategoryChange(e.target.value)}
							className="h-10 px-3 border border-gray-300 bg-gray-50 text-sm text-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
						>
							<option value="">Toutes</option>
							{PRODUCT_CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</form>

					{/* User Actions */}
					<div className="flex items-center gap-3">
						{isAuthenticated ? (
							<Link
								href="/buyer/dashboard"
								className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
								title={user?.fullName ?? "Mon compte"}
							>
								<User className="w-5 h-5" />
							</Link>
						) : (
							<Link
								href="/login"
								className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
								title="Se connecter"
							>
								<User className="w-5 h-5" />
							</Link>
						)}
						{isAuthenticated && (
							<Link
								href="/buyer/messages"
								className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
								title="Messages"
							>
								<MessageSquare className="w-5 h-5" />
								{unreadMessages > 0 && (
									<span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
										{unreadMessages > 99 ? "99+" : unreadMessages}
									</span>
								)}
							</Link>
						)}
						<Link
							href="/buyer/cart"
							className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
							title="Panier"
						>
							<ShoppingCart className="w-5 h-5" />
							{(isReady ? itemCount : 0) > 0 && (
								<span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-brand-green text-white text-[10px] font-bold rounded-full flex items-center justify-center">
									{itemCount > 99 ? "99+" : itemCount}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
