import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import { fetchProductById } from "@/lib/server/marketplace";
import { ProductDetailClient } from "@/components/buyer/ProductDetailClient";

interface PageProps {
	params: Promise<{ id: string }>;
}

async function ProductContent({ params }: PageProps) {
	const { id } = await params;

	// Basic ObjectId format validation (24 hex chars)
	if (!/^[a-fA-F0-9]{24}$/.test(id)) {
		notFound();
	}

	try {
		const product = await fetchProductById(id);

		// Only show approved products to buyers
		if (!product.isApproved) {
			notFound();
		}

		return <ProductDetailClient product={product} />;
	} catch {
		notFound();
	}
}

function ProductLoading() {
	return (
		<div className="flex items-center justify-center py-20">
			<div className="text-center">
				<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
				<p className="text-sm text-gray-500">Chargement du produit...</p>
			</div>
		</div>
	);
}

export default function ProductDetailPage({ params }: PageProps) {
	return (
		<Suspense fallback={<ProductLoading />}>
			<ProductContent params={params} />
		</Suspense>
	);
}
