"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Package,
	Plus,
	MessageSquare,
	Star,
	Settings,
} from "lucide-react";
import { getUnreadMessagesCount } from "@/lib/messages";

/** How often to refresh the unread badge (ms) */
const UNREAD_POLL_INTERVAL = 15_000;

const menuItems = [
	{
		label: "Tableau de bord",
		icon: LayoutDashboard,
		href: "/seller/dashboard",
	},
	{
		label: "Mes Produits",
		icon: Package,
		href: "/seller/products",
	},
	{
		label: "Ajouter Produit",
		icon: Plus,
		href: "/seller/products/new",
	},
	{
		label: "Messages",
		icon: MessageSquare,
		href: "/seller/messages",
		hasBadge: true,
	},
	{
		label: "Avis",
		icon: Star,
		href: "/seller/reviews",
	},
	{
		label: "Paramètres",
		icon: Settings,
		href: "/seller/settings",
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const [unreadMessages, setUnreadMessages] = useState(0);

	// Fetch unread count on mount + periodically
	useEffect(() => {
		let isMounted = true;

		async function loadUnread() {
			try {
				const count = await getUnreadMessagesCount();
				if (isMounted) setUnreadMessages(count);
			} catch {
				// Sidebar stays functional even if count fails
			}
		}

		loadUnread();
		const interval = setInterval(loadUnread, UNREAD_POLL_INTERVAL);

		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, []);

	return (
		<aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
			{/* Logo */}
			<div className="p-6 border-b border-gray-200">
				<Link href="/seller/dashboard" className="flex items-center gap-2">
					<img
						src="/logo/agrobridge-01.svg"
						alt="Agrobridge"
						className="h-8"
					/>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4">
				<ul className="space-y-1">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;
						const showBadge =
							"hasBadge" in item &&
							item.hasBadge &&
							unreadMessages > 0;

						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
										isActive
											? "bg-brand-green text-white"
											: "text-gray-700 hover:bg-gray-100"
									)}
								>
									<Icon className="w-5 h-5" />
									<span className="flex-1">{item.label}</span>
									{showBadge && (
										<span
											className={cn(
												"min-w-5 h-5 px-1.5 text-[10px] font-bold rounded-full flex items-center justify-center",
												isActive
													? "bg-white text-brand-green"
													: "bg-red-500 text-white"
											)}
										>
											{unreadMessages > 99
												? "99+"
												: unreadMessages}
										</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Help Section */}
			<div className="p-4 border-t border-gray-200">
				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-xs text-gray-600 mb-2">Besoin d'aide ?</p>
					<Link
						href="/seller/help"
						className="text-sm text-brand-green hover:underline font-medium"
					>
						Centre d'aide →
					</Link>
				</div>
			</div>
		</aside>
	);
}
