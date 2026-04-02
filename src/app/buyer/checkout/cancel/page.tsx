"use client";

import Link from "next/link";
import { XCircle, RefreshCw, ShoppingCart } from "lucide-react";
import { BuyerNavbar } from "@/components/buyer/BuyerNavbar";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function CancelContent() {
	return (
		<div className="max-w-lg mx-auto">
			<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
				<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
					<XCircle className="h-9 w-9 text-red-500" />
				</div>

				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Paiement annulé
				</h1>
				<p className="text-sm text-gray-500 mb-8">
					Le paiement a été annulé. Votre commande est enregistrée mais reste en
					attente de paiement. Vous pouvez réessayer à tout moment.
				</p>

				<div className="space-y-3">
					<Link
						href="/buyer/dashboard"
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
					>
						<RefreshCw className="w-4 h-4" />
						Voir mes commandes
					</Link>
					<Link
						href="/buyer/products"
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
					>
						<ShoppingCart className="w-4 h-4" />
						Continuer les achats
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function CheckoutCancelPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<BuyerNavbar />
			<main className="flex-1 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<ProtectedRoute allowedRoles={["buyer"]}>
						<CancelContent />
					</ProtectedRoute>
				</div>
			</main>
			<BuyerFooter />
		</div>
	);
}
