import { api } from "@/lib/api";
import type { Product } from "@/lib/products";

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export async function approveProduct(id: string): Promise<Product> {
	const { data } = await api.patch<ApiResponse<{ product: Product }>>(
		`/products/${id}/approve`
	);
	return data.data.product;
}

export async function rejectProduct(id: string): Promise<Product> {
	const { data } = await api.patch<ApiResponse<{ product: Product }>>(
		`/products/${id}/reject`
	);
	return data.data.product;
}

export async function adminDeleteProduct(id: string): Promise<void> {
	await api.delete(`/products/${id}`);
}
