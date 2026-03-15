"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "@/components/seller/StatCard";
import { RecentProducts } from "@/components/seller/RecentProducts";
import { PerformanceCard } from "@/components/seller/PerformanceCard";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, ShoppingCart, Plus } from "lucide-react";

function SellerDashboardContent() {
	const { user } = useAuth();

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
				<Button className="bg-brand-green hover:bg-brand-green/90 text-white flex items-center gap-2">
					<Plus className="w-4 h-4" />
					Ajouter un Produit
				</Button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Produits"
					value="24"
					subtitle="Dans votre catalogue"
					icon={Package}
					iconBgColor="bg-blue-100"
					iconColor="text-blue-600"
				/>
				<StatCard
					title="Annonces Actives"
					value="18"
					subtitle="En ligne actuellement"
					icon={ShoppingCart}
					iconBgColor="bg-green-100"
					iconColor="text-green-600"
					trend={{ value: "+12%", isPositive: true }}
				/>
				<StatCard
					title="Nouveaux Messages"
					value="5"
					subtitle="Non lus"
					icon={MessageSquare}
					iconBgColor="bg-orange-100"
					iconColor="text-orange-600"
				/>
				<StatCard
					title="Commandes en attente"
					value="3"
					subtitle="À traiter"
					icon={ShoppingCart}
					iconBgColor="bg-purple-100"
					iconColor="text-purple-600"
				/>
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Products - Takes 2 columns */}
				<div className="lg:col-span-2">
					<RecentProducts />
				</div>

				{/* Performance Card - Takes 1 column */}
				<div className="lg:col-span-1">
					<PerformanceCard />
				</div>
			</div>
		</div>
	);
}

export default function SellerDashboardPage() {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<SellerDashboardContent />
		</ProtectedRoute>
	);
}
