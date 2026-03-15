"use client";

import { Users, Store, Package, ShoppingCart, DollarSign } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { MonthlyRevenueChart } from "@/components/admin/MonthlyRevenueChart";
import { CategoryDistributionChart } from "@/components/admin/CategoryDistributionChart";
import { TopSellersChart } from "@/components/admin/TopSellersChart";
import { GeographicDistribution } from "@/components/admin/GeographicDistribution";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { SystemAlerts } from "@/components/admin/SystemAlerts";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const stats = [
	{
		title: "Total Users",
		value: "12,845",
		change: "+12.5%",
		icon: Users,
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		title: "Active Sellers",
		value: "3,284",
		change: "+8.2%",
		icon: Store,
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		title: "Total Products",
		value: "8,456",
		change: "+15.3%",
		icon: Package,
		iconBg: "bg-orange-100",
		iconColor: "text-orange-600",
	},
	{
		title: "Completed Orders",
		value: "5,632",
		change: "+23.1%",
		icon: ShoppingCart,
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
	},
	{
		title: "Total Revenue",
		value: "$892,450",
		change: "+18.7%",
		icon: DollarSign,
		iconBg: "bg-emerald-100",
		iconColor: "text-emerald-600",
	},
];

function AdminDashboardContent() {
	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">
					Dashboard Overview
				</h1>
				<p className="text-sm text-gray-500 mt-1">
					Welcome back! Here&apos;s what&apos;s happening with Agrobridge today.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{stats.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			{/* Charts Row 1 - Revenue + Categories */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<MonthlyRevenueChart />
				<CategoryDistributionChart />
			</div>

			{/* Charts Row 2 - Top Sellers + Geographic */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<TopSellersChart />
				<GeographicDistribution />
			</div>

			{/* Activity + Alerts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<RecentActivity />
				<SystemAlerts />
			</div>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<ProtectedRoute allowedRoles={["admin"]}>
			<AdminDashboardContent />
		</ProtectedRoute>
	);
}
