import { api } from "@/lib/api";

export type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "completed"
	| "cancelled";

export interface OrderItem {
	seller:
		| string
		| {
				_id: string;
				fullName?: string;
		  };
	sellerName: string;
	product:
		| string
		| {
				_id: string;
				name: string;
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

export interface Order {
	_id: string;
	items: OrderItem[];
	sellerIds: string[];
	totalPrice: number;
	itemCount: number;
	status: OrderStatus;
	paymentMethod: "online";
	paymentStatus: "pending" | "paid" | "failed";
	checkoutReference: string;
	stripeSessionId?: string;
	note?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CheckoutPayload {
	items: Array<{
		productId: string;
		quantity: number;
	}>;
	paymentMethod?: "online";
	note?: string;
}

export interface CheckoutResult {
	order: Order;
	summary: {
		orderCount: number;
		itemCount: number;
		totalPrice: number;
		checkoutReference: string;
	};
}

export interface StripeCheckoutSessionResult {
	sessionId: string;
	url: string;
}

export interface VerifySessionResult {
	orderId: string;
	checkoutReference: string;
	totalPrice: number;
	itemCount: number;
	paymentStatus: "pending" | "paid" | "failed";
	status: string;
	isPaid: boolean;
}

export interface BuyerOrderSummary {
	activeOrders: number;
	totalOrders: number;
	supplierCount: number;
	totalSpent: number;
}

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

/** Create the order in the database (status: pending, paymentStatus: pending) */
export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
	const { data } = await api.post<ApiResponse<CheckoutResult>>("/orders/checkout", {
		paymentMethod: "online",
		...payload,
	});

	return data.data;
}

/** Create a Stripe Checkout Session for an existing order and get the redirect URL */
export async function createStripeCheckoutSession(
	orderId: string
): Promise<StripeCheckoutSessionResult> {
	const { data } = await api.post<ApiResponse<StripeCheckoutSessionResult>>(
		"/payments/create-checkout-session",
		{ orderId }
	);

	return data.data;
}

/** Verify a Stripe session after redirect back from Stripe */
export async function verifyStripeSession(
	sessionId: string
): Promise<VerifySessionResult> {
	const { data } = await api.get<ApiResponse<VerifySessionResult>>(
		`/payments/verify-session/${sessionId}`
	);

	return data.data;
}

export async function getMyOrders(status?: OrderStatus): Promise<Order[]> {
	const { data } = await api.get<ApiResponse<{ orders: Order[] }>>("/orders/my-orders", {
		params: status ? { status } : undefined,
	});

	return data.data.orders;
}

export async function getBuyerOrderSummary(): Promise<BuyerOrderSummary> {
	const { data } = await api.get<ApiResponse<BuyerOrderSummary>>("/orders/summary");
	return data.data;
}
