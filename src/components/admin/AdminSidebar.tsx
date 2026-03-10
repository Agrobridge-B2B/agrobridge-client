"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	Users,
	UserCheck,
	Package,
	ShoppingCart,
	FileText,
	Settings,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
	{
		label: "Dashboard",
		href: "/agro-admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Users Management",
		href: "/agro-admin/agro-users",
		icon: Users,
	},
	{
		label: "Sellers & Buyers",
		href: "/agro-admin/agro-sellers-buyers",
		icon: UserCheck,
	},
	{
		label: "Products Management",
		href: "/agro-admin/agro-products",
		icon: Package,
	},
	{
		label: "Orders & Payments",
		href: "/agro-admin/agro-orders",
		icon: ShoppingCart,
	},
	{
		label: "Reviews & Reports",
		href: "/agro-admin/agro-reviews",
		icon: FileText,
	},
	{
		label: "Settings",
		href: "/agro-admin/agro-settings",
		icon: Settings,
	},
];

export function AdminSidebar() {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside
			className={cn(
				"h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 sticky top-0",
				collapsed ? "w-[70px]" : "w-[250px]",
			)}
		>
			{/* Logo */}
			<div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
				<Link href="/agro-admin/dashboard" className="flex items-center gap-2">
					<img
						src="/logo/agrobridge-01.svg"
						alt="Agrobridge"
						className={cn(
							"transition-all duration-300",
							collapsed ? "w-8 h-8" : "w-10 h-10",
						)}
					/>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
				{sidebarLinks.map((link) => {
					const Icon = link.icon;
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
								isActive
									? "bg-brand-green text-white shadow-sm"
									: "text-gray-600 hover:bg-gray-100 hover:text-brand-dark",
								collapsed && "justify-center px-2",
							)}
							title={collapsed ? link.label : undefined}
						>
							<Icon className="w-5 h-5 shrink-0" />
							{!collapsed && <span>{link.label}</span>}
						</Link>
					);
				})}
			</nav>

			{/* Collapse Toggle */}
			<div className="border-t border-gray-200 p-3">
				<button
					type="button"
					onClick={() => setCollapsed(!collapsed)}
					className="w-full flex items-center justify-left gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
				>
					{collapsed ? (
						<ChevronRight className="w-5 h-5" />
					) : (
						<>
							<ChevronLeft className="w-5 h-5" />
							<span>Collapse</span>
						</>
					)}
				</button>
			</div>
		</aside>
	);
}
