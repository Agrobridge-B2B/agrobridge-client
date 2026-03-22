import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { fetchAdminProducts } from "@/lib/server/products";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

interface PageProps {
	searchParams: Promise<{
		page?: string;
		search?: string;
		category?: string;
		isApproved?: string;
	}>;
}

async function ProductsContent({ searchParams }: PageProps) {
	const params = await searchParams;

	const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
	const search = params.search ?? "";
	const category = params.category ?? "";
	const isApproved = params.isApproved;

	try {
		const data = await fetchAdminProducts({
			page,
			limit: 20,
			search: search || undefined,
			category: category || undefined,
			isApproved,
		});

		return (
			<AdminProductsTable
				initialProducts={data.products}
				initialPagination={data.pagination}
				currentSearch={search}
				currentCategory={category}
				currentStatus={isApproved ?? ""}
			/>
		);
	} catch {
		return (
			<div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
				<p className="text-red-700 mb-2 font-medium">
					Impossible de charger les produits
				</p>
				<p className="text-sm text-red-500">
					Vérifiez que le serveur API est en cours d&apos;exécution et que vous êtes connecté en tant qu&apos;administrateur.
				</p>
			</div>
		);
	}
}

function ProductsLoading() {
	return (
		<div className="flex items-center justify-center py-16">
			<div className="text-center">
				<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
				<p className="text-sm text-gray-500">Chargement des produits...</p>
			</div>
		</div>
	);
}

export default function ProductsManagementPage({ searchParams }: PageProps) {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">
					Gestion des Produits
				</h1>
				<p className="text-sm text-gray-500 mt-1">
					Parcourir, modérer et gérer tous les produits de la plateforme
				</p>
			</div>

			{/* Products Table — streamed with Suspense */}
			<Suspense fallback={<ProductsLoading />}>
				<ProductsContent searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
