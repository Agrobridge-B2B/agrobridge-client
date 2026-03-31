import { api } from "@/lib/api";

export type SellerOrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "completed"
	| "cancelled";

export interface SellerOrderItem {
	seller: string;
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

export interface SellerOrder {
	_id: string;
	buyer:
		| string
		| {
				_id: string;
				fullName?: string;
				email?: string;
				country?: string;
		  };
	items: SellerOrderItem[];
	totalPrice: number;
	itemCount: number;
	status: SellerOrderStatus;
	paymentStatus: "pending" | "paid" | "failed";
	checkoutReference: string;
	note?: string;
	createdAt: string;
	updatedAt: string;
}

export interface SellerOrderSummary {
	totalOrders: number;
	pendingOrders: number;
	completedOrders: number;
	totalRevenue: number;
	productsSold: number;
}

export interface UserNotification {
	_id: string;
	type: "new_order" | "order_status_updated" | "seller_new_order";
	title: string;
	message: string;
	order?: string;
	isRead: boolean;
	createdAt: string;
	metadata?: Record<string, unknown>;
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

export async function getSellerOrderSummary(): Promise<SellerOrderSummary> {
	const { data } = await api.get<ApiResponse<SellerOrderSummary>>("/orders/seller/summary");
	return data.data;
}

export async function getSellerOrders(params: {
	page?: number;
	limit?: number;
	search?: string;
	status?: SellerOrderStatus;
} = {}): Promise<{ orders: SellerOrder[]; pagination: Pagination }> {
	const { data } = await api.get<
		ApiResponse<{ orders: SellerOrder[]; pagination: Pagination }>
	>("/orders/seller", {
		params,
	});

	return data.data;
}

export async function getMyNotifications(limit = 10): Promise<{
	notifications: UserNotification[];
	unreadCount: number;
}> {
	const { data } = await api.get<
		ApiResponse<{ notifications: UserNotification[]; unreadCount: number }>
	>("/notifications/me", {
		params: { limit },
	});

	return data.data;
}

export async function markMyNotificationAsRead(notificationId: string): Promise<void> {
	await api.patch(`/notifications/${notificationId}/read`);
}
