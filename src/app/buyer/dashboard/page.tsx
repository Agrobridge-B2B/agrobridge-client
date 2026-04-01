"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getBuyerOrderSummary, type BuyerOrderSummary } from "@/lib/orders";
import { getApiErrorMessage } from "@/lib/api";
import { ShoppingCart, Package, User, LogOut } from "lucide-react";

function BuyerDashboardContent() {
	const { user, logout } = useAuth();
	const { itemCount } = useCart();
	const router = useRouter();
	const [summary, setSummary] = useState<BuyerOrderSummary>({
		activeOrders: 0,
		totalOrders: 0,
		supplierCount: 0,
		totalSpent: 0,
	});
	const [summaryError, setSummaryError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function loadSummary() {
			try {
				const nextSummary = await getBuyerOrderSummary();
				if (isMounted) {
					setSummary(nextSummary);
				}
			} catch (error) {
				if (isMounted) {
					setSummaryError(getApiErrorMessage(error, "Impossible de charger vos statistiques."));
				}
			}
		}

		loadSummary();

		return () => {
			isMounted = false;
		};
	}, []);

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="/logo/agrobridge-01.svg"
								alt="Agrobridge"
								className="h-10"
							/>
							<div>
								<h1 className="text-xl font-bold text-gray-900">
									Tableau de Bord Acheteur
								</h1>
								<p className="text-sm text-gray-500">Bienvenue, {user?.fullName}</p>
							</div>
						</div>
						<Button
							onClick={handleLogout}
							variant="outline"
							className="flex items-center gap-2"
						>
							<LogOut className="w-4 h-4" />
							Déconnexion
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-brand-green/10 rounded-lg">
								<ShoppingCart className="w-6 h-6 text-brand-green" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Commandes Actives</p>
								<p className="text-2xl font-bold text-gray-900">{summary.activeOrders}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-100 rounded-lg">
								<Package className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Articles dans le panier</p>
								<p className="text-2xl font-bold text-gray-900">{itemCount}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-purple-100 rounded-lg">
								<User className="w-6 h-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Fournisseurs</p>
								<p className="text-2xl font-bold text-gray-900">{summary.supplierCount}</p>
							</div>
						</div>
					</div>
				</div>

				{summaryError && (
					<div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{summaryError}
					</div>
				)}

				{/* User Info Card */}
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						Informations du Compte
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-600">Nom Complet</p>
							<p className="text-base font-medium text-gray-900">{user?.fullName}</p>
						</div>
						<div>
							<p className="text-sm text-gray-600">Email</p>
							<p className="text-base font-medium text-gray-900">{user?.email}</p>
						</div>
						<div>
							<p className="text-sm text-gray-600">Pays</p>
							<p className="text-base font-medium text-gray-900">{user?.country}</p>
						</div>
						<div>
							<p className="text-sm text-gray-600">Rôle</p>
							<p className="text-base font-medium text-gray-900 capitalize">
								{user?.role}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-600">Statut de Vérification</p>
							<p className="text-base font-medium">
								{user?.isVerified ? (
									<span className="text-green-600">✓ Vérifié</span>
								) : (
									<span className="text-orange-600">⚠ Non vérifié</span>
								)}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
					<Link
						href="/buyer/products"
						className="rounded-lg border border-gray-200 bg-white p-5 hover:border-brand-green hover:shadow-sm transition-all"
					>
						<p className="text-sm text-gray-500">Marketplace</p>
						<p className="mt-2 text-base font-semibold text-gray-900">
							Explorer de nouveaux produits
						</p>
					</Link>
					<Link
						href="/buyer/cart"
						className="rounded-lg border border-gray-200 bg-white p-5 hover:border-brand-green hover:shadow-sm transition-all"
					>
						<p className="text-sm text-gray-500">Panier</p>
						<p className="mt-2 text-base font-semibold text-gray-900">
							Reprendre votre commande en cours
						</p>
					</Link>
					<div className="rounded-lg border border-gray-200 bg-white p-5">
						<p className="text-sm text-gray-500">Depenses cumulees</p>
						<p className="mt-2 text-base font-semibold text-gray-900">
							{summary.totalSpent.toLocaleString("fr-FR", {
								style: "currency",
								currency: "EUR",
							})}
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}

export default function BuyerDashboardPage() {
	return (
		<ProtectedRoute allowedRoles={["buyer"]}>
			<BuyerDashboardContent />
		</ProtectedRoute>
	);
}
