"use client";

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
									<span>{item.label}</span>
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
