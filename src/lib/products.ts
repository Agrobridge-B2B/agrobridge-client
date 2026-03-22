import { api } from "@/lib/api";

export interface Product {
	_id: string;
	seller: string | { _id: string; fullName: string; email: string; country: string; isCertified?: boolean };
	name: string;
	slug: string;
	description: string;
	category: string;
	country: string;
	pricePerUnit: number;
	unit: "KG" | "QUINTAL" | "TONNE";
	minOrderQuantity: number;
	images: string[];
	certifications: string[];
	isApproved: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateProductPayload {
	name: string;
	description?: string;
	category: string;
	country: string;
	pricePerUnit: number;
	unit: "KG" | "QUINTAL" | "TONNE";
	minOrderQuantity?: number;
	images?: string[];
}

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export async function getMyProducts(
	page = 1,
	limit = 12
): Promise<{ products: Product[]; pagination: Pagination }> {
	const { data } = await api.get<ApiResponse<{ products: Product[]; pagination: Pagination }>>(
		"/products/my-products",
		{ params: { page, limit } }
	);
	return data.data;
}

export async function createProduct(
	payload: CreateProductPayload
): Promise<Product> {
	const { data } = await api.post<ApiResponse<{ product: Product }>>(
		"/products",
		payload
	);
	return data.data.product;
}

export async function updateProduct(
	id: string,
	payload: Partial<CreateProductPayload>
): Promise<Product> {
	const { data } = await api.put<ApiResponse<{ product: Product }>>(
		`/products/${id}`,
		payload
	);
	return data.data.product;
}

export async function deleteProduct(id: string): Promise<void> {
	await api.delete(`/products/${id}`);
}

export async function getProductById(id: string): Promise<Product> {
	const { data } = await api.get<ApiResponse<{ product: Product }>>(
		`/products/${id}`
	);
	return data.data.product;
}
