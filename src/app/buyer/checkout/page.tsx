"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { BuyerNavbar } from "@/components/buyer/BuyerNavbar";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
	createCheckout,
	createStripeCheckoutSession,
} from "@/lib/orders";
import { getApiErrorMessage } from "@/lib/api";

function formatCurrency(value: number) {
	return value.toLocaleString("fr-FR", {
		style: "currency",
		currency: "EUR",
	});
}

function CheckoutContent() {
	const { user } = useAuth();
	const { items, subtotal, totalQuantity, clearCart } = useCart();
	const [note, setNote] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const groupedSellers = useMemo(() => {
		return Array.from(new Set(items.map((item) => item.sellerId))).length;
	}, [items]);

	async function handleCheckout() {
		if (items.length === 0) return;

		setErrorMessage(null);
		setIsSubmitting(true);

		try {
			// 1) Create the order in the database (pending payment)
			const result = await createCheckout({
				items: items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				note: note.trim() || undefined,
			});

			// 2) Create a Stripe Checkout Session for this order
			const { url } = await createStripeCheckoutSession(result.order._id);

			// 3) Clear the cart before redirecting — the order is already saved
			clearCart();

			// 4) Redirect to Stripe Checkout
			window.location.href = url;
		} catch (error) {
			setErrorMessage(
				getApiErrorMessage(error, "Impossible de lancer le paiement. Veuillez réessayer.")
			);
			setIsSubmitting(false);
		}
	}

	if (items.length === 0) {
		return (
			<div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">Aucun article à payer</h1>
				<p className="text-sm text-gray-500 mb-6">
					Ajoutez des produits au panier avant de passer au paiement.
				</p>
				<Link
					href="/buyer/products"
					className="inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
				>
					Explorer le marketplace
				</Link>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
			<section className="rounded-2xl border border-gray-200 bg-white p-6">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Paiement</h1>
				<p className="text-sm text-gray-500 mb-8">
					Vérifiez vos articles puis procédez au paiement sécurisé.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
					<div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<p className="text-sm text-gray-500">Acheteur</p>
						<p className="text-base font-semibold text-gray-900 mt-1">{user?.fullName}</p>
						<p className="text-sm text-gray-500 mt-1">{user?.email}</p>
					</div>
					<div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
						<div className="flex items-center gap-2 mb-1">
							<ShieldCheck className="w-4 h-4 text-brand-green" />
							<p className="text-sm text-gray-500">Paiement sécurisé</p>
						</div>
						<p className="text-base font-semibold text-gray-900 mt-1">
							Carte bancaire via Stripe
						</p>
						<p className="text-sm text-gray-500 mt-1">
							Vos données de paiement sont traitées de manière sécurisée.
						</p>
					</div>
				</div>

				<div className="space-y-4 mb-8">
					{items.map((item) => (
						<div
							key={item.productId}
							className="rounded-xl border border-gray-100 p-4 flex items-start justify-between gap-4"
						>
							<div>
								<p className="font-semibold text-gray-900">{item.name}</p>
								<p className="text-sm text-gray-500 mt-1">
									{item.quantity} {item.unit.toLowerCase()} · {item.sellerName}
								</p>
							</div>
							<p className="text-sm font-semibold text-brand-green shrink-0">
								{formatCurrency(item.quantity * item.pricePerUnit)}
							</p>
						</div>
					))}
				</div>

				<label className="block">
					<span className="text-sm font-medium text-gray-700">Note de commande</span>
					<textarea
						value={note}
						onChange={(event) => setNote(event.target.value)}
						rows={4}
						maxLength={500}
						placeholder="Ajoutez des instructions utiles pour les vendeurs ou la livraison."
						className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green resize-none"
					/>
				</label>

				{errorMessage && (
					<div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{errorMessage}
					</div>
				)}
			</section>

			<aside className="rounded-2xl border border-gray-200 bg-white p-6 h-fit">
				<h2 className="text-lg font-semibold text-gray-900 mb-5">Résumé</h2>
				<div className="space-y-3 text-sm text-gray-600">
					<div className="flex items-center justify-between">
						<span>Produits</span>
						<span>{items.length}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Quantité totale</span>
						<span>{totalQuantity}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Vendeurs</span>
						<span>{groupedSellers}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Sous-total</span>
						<span>{formatCurrency(subtotal)}</span>
					</div>
				</div>

				<div className="mt-5 border-t border-gray-100 pt-5 flex items-center justify-between">
					<span className="font-semibold text-gray-900">Total</span>
					<span className="text-xl font-bold text-brand-green">{formatCurrency(subtotal)}</span>
				</div>

				<button
					type="button"
					onClick={handleCheckout}
					disabled={isSubmitting}
					className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							Redirection vers Stripe...
						</>
					) : (
						<>
							<CreditCard className="w-4 h-4" />
							Payer {formatCurrency(subtotal)}
						</>
					)}
				</button>

				<div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
					<Lock className="w-3 h-3" />
					<span>Paiement sécurisé par Stripe</span>
				</div>

				<Link
					href="/buyer/cart"
					className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
				>
					Retour au panier
				</Link>
			</aside>
		</div>
	);
}

export default function BuyerCheckoutPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<BuyerNavbar />
			<main className="flex-1 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<ProtectedRoute allowedRoles={["buyer"]}>
						<CheckoutContent />
					</ProtectedRoute>
				</div>
			</main>
			<BuyerFooter />
		</div>
	);
}
