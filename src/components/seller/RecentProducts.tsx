"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { getMyProducts, type Product } from "@/lib/products";
import { getApiErrorMessage } from "@/lib/api";

export function RecentProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function loadRecentProducts() {
			try {
				const data = await getMyProducts(1, 3);
				if (isMounted) {
					setProducts(data.products);
				}
			} catch (error) {
				if (isMounted) {
					setErrorMessage(getApiErrorMessage(error, "Impossible de charger vos produits."));
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadRecentProducts();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="bg-white rounded-xl border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">
						Produits Récents
					</h2>
					<p className="text-sm text-gray-500">
						Vos dernières annonces publiées
					</p>
				</div>
				<Link
					href="/seller/products"
					className="text-sm font-medium text-brand-green hover:underline"
				>
					Voir tout
				</Link>
			</div>

			{isLoading ? (
				<div className="py-10 text-center text-sm text-gray-500">
					Chargement des produits...
				</div>
			) : errorMessage ? (
				<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			) : products.length === 0 ? (
				<div className="py-10 text-center text-sm text-gray-500">
					Aucun produit publie pour le moment.
				</div>
			) : (
				<div className="space-y-4">
					{products.map((product) => (
						<div
							key={product._id}
							className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
								<Package className="w-8 h-8 text-gray-400" />
							</div>

							<div className="flex-1">
								<h3 className="font-medium text-gray-900">{product.name}</h3>
								<p className="text-sm text-gray-500">{product.category}</p>
							</div>

							<div className="text-right">
								<p className="font-semibold text-brand-green">
									{product.pricePerUnit.toLocaleString("fr-FR", {
										style: "currency",
										currency: "EUR",
									})}
									/{product.unit.toLowerCase()}
								</p>
								<p className="text-xs text-gray-500">
									{product.isApproved ? "Actif" : "En attente"}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
