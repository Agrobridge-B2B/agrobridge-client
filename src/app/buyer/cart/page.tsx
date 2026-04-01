"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { BuyerNavbar } from "@/components/buyer/BuyerNavbar";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/lib/upload";

function formatCurrency(value: number) {
	return value.toLocaleString("fr-FR", {
		style: "currency",
		currency: "EUR",
	});
}

export default function BuyerCartPage() {
	const { isAuthenticated } = useAuth();
	const {
		items,
		isReady,
		subtotal,
		totalQuantity,
		updateQuantity,
		removeItem,
		clearCart,
	} = useCart();

	return (
		<div className="min-h-screen bg-white flex flex-col">
			<BuyerNavbar />
			<main className="flex-1 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Votre panier</h1>
							<p className="text-sm text-gray-500 mt-2">
								{items.length} article{items.length > 1 ? "s" : ""} dans le panier
							</p>
						</div>
						{items.length > 0 && (
							<button
								type="button"
								onClick={clearCart}
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
							>
								<Trash2 className="w-4 h-4" />
								Vider le panier
							</button>
						)}
					</div>

					{!isReady ? (
						<div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
							Chargement du panier...
						</div>
					) : items.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
								<ShoppingCart className="h-8 w-8 text-brand-green" />
							</div>
							<h2 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
							<p className="text-sm text-gray-500 mb-6">
								Ajoutez des produits depuis le marketplace pour preparer votre commande.
							</p>
							<Link
								href="/buyer/products"
								className="inline-flex items-center justify-center rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
							>
								Explorer les produits
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
							<div className="space-y-4">
								{items.map((item) => (
									<div
										key={item.productId}
										className="rounded-2xl border border-gray-200 bg-white p-5"
									>
										<div className="flex flex-col sm:flex-row gap-4">
											<div className="relative h-28 w-full sm:w-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
												{item.image ? (
													<Image
														src={getImageUrl(item.image)}
														alt={item.name}
														fill
														className="object-cover"
														sizes="128px"
														unoptimized
													/>
												) : (
													<div className="flex h-full items-center justify-center text-gray-300">
														<ShoppingCart className="h-8 w-8" />
													</div>
												)}
											</div>

											<div className="flex-1">
												<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
													<div>
														<Link
															href={`/buyer/products/${item.productId}`}
															className="text-lg font-semibold text-gray-900 hover:text-brand-green transition-colors"
														>
															{item.name}
														</Link>
														<p className="text-sm text-gray-500 mt-1">
															Par {item.sellerName} · {item.country}
														</p>
														<p className="text-sm text-gray-500 mt-1">
															Minimum {item.minOrderQuantity} {item.unit.toLowerCase()}
														</p>
													</div>
													<p className="text-lg font-bold text-gray-900">
														{formatCurrency(item.pricePerUnit)}
														<span className="text-sm font-normal text-gray-500">
															{" "}
															/{item.unit.toLowerCase()}
														</span>
													</p>
												</div>

												<div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
													<div className="inline-flex items-center rounded-lg border border-gray-200">
														<button
															type="button"
															onClick={() =>
																updateQuantity(item.productId, item.quantity - 1)
															}
															className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
														>
															<Minus className="w-4 h-4" />
														</button>
														<input
															type="number"
															value={item.quantity}
															onChange={(event) =>
																updateQuantity(
																	item.productId,
																	Number.parseInt(event.target.value, 10) ||
																		item.minOrderQuantity,
																)
															}
															min={item.minOrderQuantity}
															className="w-20 border-x border-gray-200 py-2 text-center text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
														/>
														<button
															type="button"
															onClick={() =>
																updateQuantity(item.productId, item.quantity + 1)
															}
															className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
														>
															<Plus className="w-4 h-4" />
														</button>
													</div>

													<div className="flex items-center justify-between sm:justify-end gap-4">
														<p className="text-sm font-semibold text-brand-green">
															{formatCurrency(item.quantity * item.pricePerUnit)}
														</p>
														<button
															type="button"
															onClick={() => removeItem(item.productId)}
															className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
														>
															Supprimer
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							<aside className="rounded-2xl border border-gray-200 bg-white p-6 h-fit">
								<h2 className="text-lg font-semibold text-gray-900 mb-5">Résumé</h2>
								<div className="space-y-3 text-sm text-gray-600">
									<div className="flex items-center justify-between">
										<span>Articles</span>
										<span>{totalQuantity}</span>
									</div>
									<div className="flex items-center justify-between">
										<span>Sous-total</span>
										<span>{formatCurrency(subtotal)}</span>
									</div>
									<div className="flex items-center justify-between">
										<span>Livraison</span>
										<span>Calculée à l'étape suivante</span>
									</div>
								</div>

								<div className="mt-5 border-t border-gray-100 pt-5 flex items-center justify-between">
									<span className="font-semibold text-gray-900">Total estimé</span>
									<span className="text-xl font-bold text-brand-green">
										{formatCurrency(subtotal)}
									</span>
								</div>

								{isAuthenticated ? (
									<Link
										href="/buyer/checkout"
										className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-green px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
									>
										Passer au paiement
									</Link>
								) : (
									<Link
										href="/login"
										className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-green px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors"
									>
										Se connecter pour continuer
									</Link>
								)}

								<Link
									href="/buyer/products"
									className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
								>
									Continuer les achats
								</Link>
							</aside>
						</div>
					)}
				</div>
			</main>
			<BuyerFooter />
		</div>
	);
}
