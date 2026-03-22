import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { fetchMarketplaceProducts } from "@/lib/server/marketplace";
import { BuyerProductCard } from "@/components/buyer/BuyerProductCard";
import { ProductsPagination } from "@/components/buyer/ProductsPagination";

interface PageProps {
	searchParams: Promise<{
		page?: string;
		search?: string;
		category?: string;
	}>;
}

async function ProductsGrid({ searchParams }: PageProps) {
	const params = await searchParams;

	const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
	const search = params.search ?? "";
	const category = params.category ?? "";

	try {
		const data = await fetchMarketplaceProducts({
			page,
			limit: 12,
			search: search || undefined,
			category: category || undefined,
		});

		return (
			<>
				<p className="text-sm text-gray-500 mb-6">
					{data.pagination.total} produit{data.pagination.total > 1 ? "s" : ""} trouvé{data.pagination.total > 1 ? "s" : ""}
				</p>

				{data.products.length === 0 ? (
					<div className="text-center py-16">
						<p className="text-gray-400 text-lg mb-2">Aucun produit trouvé</p>
						<p className="text-sm text-gray-400">
							Essayez de modifier vos critères de recherche
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{data.products.map((product) => (
							<BuyerProductCard key={product._id} product={product} />
						))}
					</div>
				)}

				<ProductsPagination
					total={data.pagination.total}
					page={data.pagination.page}
					pages={data.pagination.pages}
				/>
			</>
		);
	} catch {
		return (
			<div className="text-center py-16">
				<p className="text-red-600 mb-2 font-medium">
					Impossible de charger les produits
				</p>
				<p className="text-sm text-gray-500">
					Vérifiez que le serveur est en cours d&apos;exécution et réessayez.
				</p>
			</div>
		);
	}
}

function ProductsLoading() {
	return (
		<div className="flex items-center justify-center py-20">
			<div className="text-center">
				<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
				<p className="text-sm text-gray-500">Chargement des produits...</p>
			</div>
		</div>
	);
}

export default function BuyerProductsPage({ searchParams }: PageProps) {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Hero */}
			<div className="text-center mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Découvrez des produits agricoles frais d&apos;Afrique
				</h1>
				<p className="text-sm text-gray-500 max-w-2xl mx-auto">
					Agrobridge connecte les producteurs africains vérifiés avec les acheteurs internationaux.
					Qualité, traçabilité et paiement sécurisé.
				</p>
			</div>

			{/* Products Grid — streamed with Suspense */}
			<Suspense fallback={<ProductsLoading />}>
				<ProductsGrid searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
