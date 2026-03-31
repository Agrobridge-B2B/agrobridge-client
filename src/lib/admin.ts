import { api } from "@/lib/api";

export type AdminOrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "completed"
	| "cancelled";

export interface AdminOrderItem {
	seller: string | { _id: string };
	sellerName: string;
	product:
		| string
		| {
				_id: string;
				name?: string;
				images?: string[];
				unit?: string;
		  };
	productName: string;
	productImage?: string;
	quantity: number;
	unit: string;
	unitPrice: number;
	lineTotal: number;
}

export interface AdminOrder {
	_id: string;
	buyer:
		| string
		| {
				_id: string;
				fullName?: string;
				email?: string;
				country?: string;
		  };
	items: AdminOrderItem[];
	sellerIds: string[];
	totalPrice: number;
	itemCount: number;
	status: AdminOrderStatus;
	paymentMethod: "online";
	paymentStatus: "pending" | "paid" | "failed";
	checkoutReference: string;
	note?: string;
	createdAt: string;
	updatedAt: string;
}

export interface AdminOrdersPagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export interface AdminOrdersResponse {
	orders: AdminOrder[];
	pagination: AdminOrdersPagination;
}

export interface AdminOrderSummary {
	totalOrders: number;
	totalRevenue: number;
	pendingOrders: number;
	completedOrders: number;
}

export interface AdminNotification {
	_id: string;
	type: "new_order" | "order_status_updated";
	title: string;
	message: string;
	order?: string;
	isRead: boolean;
	createdAt: string;
	metadata?: Record<string, unknown>;
}

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export async function getAdminOrders(params: {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
} = {}): Promise<AdminOrdersResponse> {
	const { data } = await api.get<ApiResponse<AdminOrdersResponse>>("/orders/admin", {
		params,
	});

	return data.data;
}

export async function getAdminOrderSummary(): Promise<AdminOrderSummary> {
	const { data } = await api.get<ApiResponse<AdminOrderSummary>>("/orders/admin/summary");
	return data.data;
}

export async function updateAdminOrderStatus(
	orderId: string,
	status: AdminOrderStatus,
): Promise<AdminOrder> {
	const { data } = await api.patch<ApiResponse<{ order: AdminOrder }>>(
		`/orders/${orderId}/status`,
		{ status },
	);

	return data.data.order;
}

export async function getAdminNotifications(limit = 10): Promise<{
	notifications: AdminNotification[];
	unreadCount: number;
}> {
	const { data } = await api.get<
		ApiResponse<{ notifications: AdminNotification[]; unreadCount: number }>
	>("/notifications/admin", {
		params: { limit },
	});

	return data.data;
}

export async function markAdminNotificationAsRead(notificationId: string): Promise<void> {
	await api.patch(`/notifications/${notificationId}/read`);
}

export async function getAdminUserCount(role?: string): Promise<number> {
	const { data } = await api.get<
		ApiResponse<{ users: Array<{ _id: string }>; pagination: { total: number } }>
	>("/users", {
		params: { page: 1, limit: 1, ...(role ? { role } : {}) },
	});

	return data.data.pagination.total;
}

export async function getAdminProductCount(): Promise<number> {
	const { data } = await api.get<
		ApiResponse<{ products: Array<{ _id: string }>; pagination: { total: number } }>
	>("/products", {
		params: { page: 1, limit: 1 },
	});

	return data.data.pagination.total;
}
