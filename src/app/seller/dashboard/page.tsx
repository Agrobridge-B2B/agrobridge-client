"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "@/components/seller/StatCard";
import { RecentProducts } from "@/components/seller/RecentProducts";
import { PerformanceCard } from "@/components/seller/PerformanceCard";
import { Button } from "@/components/ui/button";
import { Package, Bell, ShoppingCart, Plus } from "lucide-react";
import { getMyProducts } from "@/lib/products";
import { getApiErrorMessage } from "@/lib/api";
import { getSellerOrderSummary, getMyNotifications } from "@/lib/seller";

function SellerDashboardContent() {
	const { user } = useAuth();
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalOrders: 0,
		unreadNotifications: 0,
		pendingOrders: 0,
		productsSold: 0,
		completedOrders: 0,
		totalRevenue: 0,
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function loadSellerDashboard() {
			try {
				const [productsData, orderSummary, notificationsData] = await Promise.all([
					getMyProducts(1, 1),
					getSellerOrderSummary(),
					getMyNotifications(1),
				]);

				if (!isMounted) {
					return;
				}

				setStats({
					totalProducts: productsData.pagination.total,
					totalOrders: orderSummary.totalOrders,
					unreadNotifications: notificationsData.unreadCount,
					pendingOrders: orderSummary.pendingOrders,
					productsSold: orderSummary.productsSold,
					completedOrders: orderSummary.completedOrders,
					totalRevenue: orderSummary.totalRevenue,
				});
			} catch (error) {
				if (isMounted) {
					setErrorMessage(getApiErrorMessage(error, "Impossible de charger les statistiques vendeur."));
				}
			}
		}

		loadSellerDashboard();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Bienvenue, {user?.fullName?.split(" ")[0]}!
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Voici un aperçu de votre activité
					</p>
				</div>
				<Link href="/seller/products/new">
					<Button className="bg-brand-green hover:bg-brand-green/90 text-white flex items-center gap-2">
						<Plus className="w-4 h-4" />
						Ajouter un Produit
					</Button>
				</Link>
			</div>

			{errorMessage && (
				<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			)}

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Produits"
					value={stats.totalProducts}
					subtitle="Dans votre catalogue"
					icon={Package}
					iconBgColor="bg-blue-100"
					iconColor="text-blue-600"
				/>
				<StatCard
					title="Commandes totales"
					value={stats.totalOrders}
					subtitle="Toutes vos commandes"
					icon={ShoppingCart}
					iconBgColor="bg-green-100"
					iconColor="text-green-600"
				/>
				<StatCard
					title="Notifications"
					value={stats.unreadNotifications}
					subtitle="Non lues"
					icon={Bell}
					iconBgColor="bg-orange-100"
					iconColor="text-orange-600"
				/>
				<StatCard
					title="Commandes en attente"
					value={stats.pendingOrders}
					subtitle="À traiter"
					icon={ShoppingCart}
					iconBgColor="bg-purple-100"
					iconColor="text-purple-600"
				/>
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<RecentProducts />
				</div>

				<div className="lg:col-span-1">
					<PerformanceCard
						summary={{
							totalOrders: stats.totalOrders,
							pendingOrders: stats.pendingOrders,
							completedOrders: stats.completedOrders,
							totalRevenue: stats.totalRevenue,
							productsSold: stats.productsSold,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default function SellerDashboardPage() {
	return <SellerDashboardContent />;
}
