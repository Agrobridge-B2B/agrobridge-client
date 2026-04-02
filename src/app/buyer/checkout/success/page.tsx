"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, Package, ArrowRight } from "lucide-react";
import { BuyerNavbar } from "@/components/buyer/BuyerNavbar";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { verifyStripeSession, type VerifySessionResult } from "@/lib/orders";

function formatCurrency(value: number) {
	return value.toLocaleString("fr-FR", {
		style: "currency",
		currency: "EUR",
	});
}

function SuccessContent() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [result, setResult] = useState<VerifySessionResult | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!sessionId) {
			setError("Session de paiement introuvable.");
			setIsLoading(false);
			return;
		}

		let isMounted = true;

		async function verify() {
			try {
				const data = await verifyStripeSession(sessionId!);
				if (isMounted) setResult(data);
			} catch {
				if (isMounted) setError("Impossible de vérifier le paiement.");
			} finally {
				if (isMounted) setIsLoading(false);
			}
		}

		verify();

		return () => {
			isMounted = false;
		};
	}, [sessionId]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-24">
				<div className="text-center">
					<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
					<p className="text-sm text-gray-500">Vérification du paiement...</p>
				</div>
			</div>
		);
	}

	if (error || !result) {
		return (
			<div className="rounded-2xl border border-red-200 bg-white p-10 text-center max-w-lg mx-auto">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
				<p className="text-sm text-gray-500 mb-6">{error || "Une erreur est survenue."}</p>
				<Link
					href="/buyer/dashboard"
					className="inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
				>
					Retour au tableau de bord
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-lg mx-auto">
			<div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm text-center">
				<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
					<CheckCircle className="h-9 w-9 text-emerald-600" />
				</div>

				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					{result.isPaid ? "Paiement confirmé !" : "Commande enregistrée"}
				</h1>
				<p className="text-sm text-gray-500 mb-6">
					{result.isPaid
						? "Votre paiement a été traité avec succès. Votre commande est maintenant confirmée."
						: "Votre commande a été enregistrée. Le paiement est en cours de traitement."}
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
					<div className="rounded-xl bg-emerald-50 p-4">
						<p className="text-xs text-gray-500">Référence</p>
						<p className="text-sm font-semibold text-gray-900 mt-0.5">
							{result.checkoutReference}
						</p>
					</div>
					<div className="rounded-xl bg-emerald-50 p-4">
						<p className="text-xs text-gray-500">Articles</p>
						<p className="text-sm font-semibold text-gray-900 mt-0.5">
							{result.itemCount}
						</p>
					</div>
					<div className="rounded-xl bg-emerald-50 p-4">
						<p className="text-xs text-gray-500">Montant</p>
						<p className="text-sm font-semibold text-gray-900 mt-0.5">
							{formatCurrency(result.totalPrice)}
						</p>
					</div>
				</div>

				<div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
					<Package className="w-4 h-4" />
					Statut : {result.isPaid ? "Confirmée" : "En attente de confirmation"}
				</div>

				<div className="space-y-3">
					<Link
						href="/buyer/dashboard"
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
					>
						Voir mes commandes
						<ArrowRight className="w-4 h-4" />
					</Link>
					<Link
						href="/buyer/products"
						className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Continuer les achats
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function CheckoutSuccessPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<BuyerNavbar />
			<main className="flex-1 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<ProtectedRoute allowedRoles={["buyer"]}>
						<SuccessContent />
					</ProtectedRoute>
				</div>
			</main>
			<BuyerFooter />
		</div>
	);
}
