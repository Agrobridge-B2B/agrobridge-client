"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Store, Package, TrendingUp, LogOut } from "lucide-react";

function SellerDashboardContent() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
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
									Tableau de Bord Vendeur
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
								<Store className="w-6 h-6 text-brand-green" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Produits Actifs</p>
								<p className="text-2xl font-bold text-gray-900">0</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-100 rounded-lg">
								<Package className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Commandes Reçues</p>
								<p className="text-2xl font-bold text-gray-900">0</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-purple-100 rounded-lg">
								<TrendingUp className="w-6 h-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Ventes du Mois</p>
								<p className="text-2xl font-bold text-gray-900">0 FCFA</p>
							</div>
						</div>
					</div>
				</div>

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

				{/* Placeholder for future features */}
				<div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
					<h3 className="text-lg font-semibold text-green-900 mb-2">
						Tableau de Bord en Construction
					</h3>
					<p className="text-green-700">
						Les fonctionnalités de vente seront bientôt disponibles.
					</p>
				</div>
			</main>
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
