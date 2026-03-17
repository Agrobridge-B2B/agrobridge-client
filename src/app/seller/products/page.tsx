"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ProductCard } from "@/components/seller/ProductCard";
import { getMyProducts, type Product } from "@/lib/products";
import { getApiErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Package } from "lucide-react";
import Link from "next/link";

function ProductsPageContent() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);

	const loadProducts = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await getMyProducts(page, 12);
			setProducts(data.products);
			setTotalPages(data.pagination.pages);
			setTotalProducts(data.pagination.total);
		} catch (err) {
			setError(getApiErrorMessage(err));
		} finally {
			setIsLoading(false);
		}
	}, [page]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	function getProductStatus(product: Product): "active" | "pending" | "inactive" {
		if (product.isApproved) return "active";
		return "pending";
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Mes Produits</h1>
					<p className="text-sm text-gray-500 mt-1">
						{totalProducts > 0
							? `${totalProducts} produit${totalProducts > 1 ? "s" : ""} dans votre catalogue`
							: "Gérez votre catalogue de produits"}
					</p>
				</div>
				<Link href="/seller/products/new">
					<Button className="bg-brand-green hover:bg-brand-green/90 text-white flex items-center gap-2">
						<Plus className="w-4 h-4" />
						Ajouter Produit
					</Button>
				</Link>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="flex items-center justify-center py-16">
					<div className="text-center">
						<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
						<p className="text-sm text-gray-500">Chargement de vos produits...</p>
					</div>
				</div>
			)}

			{/* Error State */}
			{error && !isLoading && (
				<div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
					<p className="text-red-700 mb-4">{error}</p>
					<Button onClick={loadProducts} variant="outline">
						Réessayer
					</Button>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !error && products.length === 0 && (
				<div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
					<Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						Aucun produit
					</h3>
					<p className="text-gray-500 mb-6 max-w-md mx-auto">
						Commencez par ajouter votre premier produit pour le rendre visible aux acheteurs
					</p>
					<Link href="/seller/products/new">
						<Button className="bg-brand-green hover:bg-brand-green/90 text-white">
							<Plus className="w-4 h-4 mr-2" />
							Ajouter un produit
						</Button>
					</Link>
				</div>
			)}

			{/* Products Grid */}
			{!isLoading && !error && products.length > 0 && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{products.map((product) => (
							<ProductCard
								key={product._id}
								id={product._id}
								name={product.name}
								category={product.category}
								pricePerUnit={product.pricePerUnit}
								unit={product.unit}
								image={product.images?.[0]}
								status={getProductStatus(product)}
								onDeleted={loadProducts}
							/>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-center gap-2 pt-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
							>
								Précédent
							</Button>
							<span className="text-sm text-gray-600 px-3">
								Page {page} sur {totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
							>
								Suivant
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default function ProductsPage() {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<ProductsPageContent />
		</ProtectedRoute>
	);
}
