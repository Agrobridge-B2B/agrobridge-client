import type { Product } from "@/lib/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "http://localhost:8000/api";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface MarketplaceResponse {
	products: Product[];
	pagination: Pagination;
}

interface FetchMarketplaceParams {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
}

/**
 * Server-side fetch for marketplace products (public, no auth needed).
 * Returns only approved products, sorted by certified seller priority.
 */
export async function fetchMarketplaceProducts(
	params: FetchMarketplaceParams = {}
): Promise<MarketplaceResponse> {
	const searchParams = new URLSearchParams();
	searchParams.set("page", String(params.page ?? 1));
	searchParams.set("limit", String(params.limit ?? 12));
	if (params.search) searchParams.set("search", params.search);
	if (params.category) searchParams.set("category", params.category);

	const res = await fetch(
		`${API_BASE_URL}/products/marketplace?${searchParams.toString()}`,
		{ cache: "no-store" }
	);

	if (!res.ok) {
		throw new Error(`Erreur lors de la récupération des produits (${res.status})`);
	}

	const json = await res.json();
	return json.data as MarketplaceResponse;
}

/**
 * Server-side fetch for a single product by ID (public, no auth needed).
 */
export async function fetchProductById(id: string): Promise<Product> {
	const res = await fetch(`${API_BASE_URL}/products/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error(`Produit introuvable (${res.status})`);
	}

	const json = await res.json();
	return json.data.product as Product;
}
