"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, Store, Package, ShoppingCart, DollarSign } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { MonthlyRevenueChart } from "@/components/admin/MonthlyRevenueChart";
import { CategoryDistributionChart } from "@/components/admin/CategoryDistributionChart";
import { TopSellersChart } from "@/components/admin/TopSellersChart";
import { GeographicDistribution } from "@/components/admin/GeographicDistribution";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { SystemAlerts } from "@/components/admin/SystemAlerts";
import {
	getAdminOrderSummary,
	getAdminProductCount,
	getAdminUserCount,
} from "@/lib/admin";
import { getApiErrorMessage } from "@/lib/api";

function AdminDashboardContent() {
	const [statsState, setStatsState] = useState({
		totalUsers: 0,
		activeSellers: 0,
		totalProducts: 0,
		completedOrders: 0,
		totalRevenue: 0,
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function loadDashboardStats() {
			try {
				const [totalUsers, activeSellers, totalProducts, orderSummary] = await Promise.all([
					getAdminUserCount(),
					getAdminUserCount("seller"),
					getAdminProductCount(),
					getAdminOrderSummary(),
				]);

				if (!isMounted) {
					return;
				}

				setStatsState({
					totalUsers,
					activeSellers,
					totalProducts,
					completedOrders: orderSummary.completedOrders,
					totalRevenue: orderSummary.totalRevenue,
				});
			} catch (error) {
				if (isMounted) {
					setErrorMessage(
						getApiErrorMessage(error, "Unable to load dashboard statistics."),
					);
				}
			}
		}

		loadDashboardStats();

		return () => {
			isMounted = false;
		};
	}, []);

	const stats = useMemo(
		() => [
			{
				title: "Total Users",
				value: statsState.totalUsers.toLocaleString("en-US"),
				change: "Live",
				icon: Users,
				iconBg: "bg-blue-100",
				iconColor: "text-blue-600",
			},
			{
				title: "Active Sellers",
				value: statsState.activeSellers.toLocaleString("en-US"),
				change: "Live",
				icon: Store,
				iconBg: "bg-green-100",
				iconColor: "text-green-600",
			},
			{
				title: "Total Products",
				value: statsState.totalProducts.toLocaleString("en-US"),
				change: "Live",
				icon: Package,
				iconBg: "bg-orange-100",
				iconColor: "text-orange-600",
			},
			{
				title: "Completed Orders",
				value: statsState.completedOrders.toLocaleString("en-US"),
				change: "Live",
				icon: ShoppingCart,
				iconBg: "bg-purple-100",
				iconColor: "text-purple-600",
			},
			{
				title: "Total Revenue",
				value: statsState.totalRevenue.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
				}),
				change: "Live",
				icon: DollarSign,
				iconBg: "bg-emerald-100",
				iconColor: "text-emerald-600",
			},
		],
		[statsState],
	);

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

			{errorMessage && (
				<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			)}

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
	return <AdminDashboardContent />;
}
