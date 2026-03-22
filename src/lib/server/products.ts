import { cookies } from "next/headers";
import type { Product } from "@/lib/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "http://localhost:8000/api";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface ProductsResponse {
	products: Product[];
	pagination: Pagination;
}

interface FetchProductsParams {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
	isApproved?: string;
}

/**
 * Server-side fetch for admin products list.
 * Reads the auth_token cookie and forwards it to the API.
 */
export async function fetchAdminProducts(
	params: FetchProductsParams = {}
): Promise<ProductsResponse> {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token")?.value;

	const searchParams = new URLSearchParams();
	searchParams.set("page", String(params.page ?? 1));
	searchParams.set("limit", String(params.limit ?? 20));
	if (params.search) searchParams.set("search", params.search);
	if (params.category) searchParams.set("category", params.category);
	if (params.isApproved !== undefined && params.isApproved !== "all") {
		searchParams.set("isApproved", params.isApproved);
	}

	const res = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`, {
		headers: {
			"Content-Type": "application/json",
			...(token ? { Cookie: `auth_token=${token}` } : {}),
		},
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error(`Erreur lors de la récupération des produits (${res.status})`);
	}

	const json = await res.json();
	return json.data as ProductsResponse;
}
