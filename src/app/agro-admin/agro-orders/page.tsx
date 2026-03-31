"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
	ShoppingCart,
	DollarSign,
	Clock,
	CheckCircle,
	Search,
	Eye,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import {
	getAdminOrders,
	getAdminOrderSummary,
	updateAdminOrderStatus,
	type AdminOrder,
	type AdminOrderStatus,
} from "@/lib/admin";
import { getApiErrorMessage } from "@/lib/api";

const STATUS_FILTERS: Array<{ label: string; value: "" | AdminOrderStatus }> = [
	{ label: "All", value: "" },
	{ label: "Pending", value: "pending" },
	{ label: "Confirmed", value: "confirmed" },
	{ label: "Shipped", value: "shipped" },
	{ label: "Delivered", value: "delivered" },
	{ label: "Cancelled", value: "cancelled" },
];

const STATUS_LABELS: Record<AdminOrderStatus, string> = {
	pending: "Pending",
	confirmed: "Confirmed",
	shipped: "Shipped",
	delivered: "Delivered",
	completed: "Completed",
	cancelled: "Cancelled",
};

function formatCurrency(value: number) {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	});
}

function formatDate(value: string) {
	return new Date(value).toLocaleDateString("en-CA");
}

function getStatusBadge(status: AdminOrderStatus) {
	if (status === "delivered" || status === "completed") {
		return "bg-green-100 text-green-700";
	}
	if (status === "shipped" || status === "confirmed") {
		return "bg-blue-100 text-blue-700";
	}
	if (status === "pending") {
		return "bg-yellow-100 text-yellow-700";
	}
	return "bg-red-100 text-red-700";
}

function getPaymentBadge(paymentStatus: AdminOrder["paymentStatus"]) {
	if (paymentStatus === "paid") {
		return "bg-emerald-100 text-emerald-700";
	}
	if (paymentStatus === "pending") {
		return "bg-yellow-100 text-yellow-700";
	}
	return "bg-gray-100 text-gray-700";
}

function getBuyerLabel(order: AdminOrder) {
	if (typeof order.buyer === "object" && order.buyer !== null) {
		return order.buyer.fullName || order.buyer.email || "Unknown buyer";
	}
	return "Unknown buyer";
}

function getSellerSummary(order: AdminOrder) {
	return Array.from(new Set(order.items.map((item) => item.sellerName))).join(", ");
}

function getProductSummary(order: AdminOrder) {
	return order.items
		.slice(0, 2)
		.map((item) => item.productName)
		.join(", ");
}

export default function OrdersPaymentsPage() {
	const [summary, setSummary] = useState({
		totalOrders: 0,
		totalRevenue: 0,
		pendingOrders: 0,
		completedOrders: 0,
	});
	const [orders, setOrders] = useState<AdminOrder[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<"" | AdminOrderStatus>("");
	const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setPage(1);
			setSearch(searchInput.trim());
		}, 300);

		return () => window.clearTimeout(timeout);
	}, [searchInput]);

	useEffect(() => {
		let isMounted = true;

		async function loadOrdersData() {
			try {
				setIsLoading(true);
				setErrorMessage(null);

				const [ordersData, summaryData] = await Promise.all([
					getAdminOrders({
						page,
						limit: 10,
						search: search || undefined,
						status: statusFilter || undefined,
					}),
					getAdminOrderSummary(),
				]);

				if (!isMounted) {
					return;
				}

				setOrders(ordersData.orders);
				setPages(ordersData.pagination.pages || 1);
				setSummary(summaryData);
			} catch (error) {
				if (!isMounted) {
					return;
				}

				setErrorMessage(getApiErrorMessage(error, "Unable to load orders."));
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadOrdersData();

		return () => {
			isMounted = false;
		};
	}, [page, search, statusFilter]);

	const stats = useMemo(
		() => [
			{
				label: "Total Orders",
				value: summary.totalOrders.toLocaleString("en-US"),
				icon: ShoppingCart,
				color: "bg-blue-100 text-blue-600",
			},
			{
				label: "Revenue",
				value: formatCurrency(summary.totalRevenue),
				icon: DollarSign,
				color: "bg-green-100 text-green-600",
			},
			{
				label: "Pending",
				value: summary.pendingOrders.toLocaleString("en-US"),
				icon: Clock,
				color: "bg-yellow-100 text-yellow-600",
			},
			{
				label: "Completed",
				value: summary.completedOrders.toLocaleString("en-US"),
				icon: CheckCircle,
				color: "bg-emerald-100 text-emerald-600",
			},
		],
		[summary],
	);

	async function handleStatusChange(orderId: string, status: AdminOrderStatus) {
		try {
			setUpdatingOrderId(orderId);
			const updatedOrder = await updateAdminOrderStatus(orderId, status);
			setOrders((current) =>
				current.map((order) => (order._id === orderId ? { ...order, ...updatedOrder } : order)),
			);
			setSummary(await getAdminOrderSummary());
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error, "Unable to update the order status."));
		} finally {
			setUpdatingOrderId(null);
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">Orders & Payments</h1>
				<p className="text-sm text-gray-500 mt-1">
					Track live marketplace orders, payments, and fulfillment progress
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
						>
							<div
								className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
							>
								<Icon className="w-5 h-5" />
							</div>
							<div>
								<p className="text-xs text-gray-500">{stat.label}</p>
								<p className="text-lg font-bold text-brand-dark">{stat.value}</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-100">
					<div className="relative w-full lg:w-72">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="text"
							value={searchInput}
							onChange={(event) => setSearchInput(event.target.value)}
							placeholder="Search orders..."
							className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
						/>
					</div>
					<div className="flex items-center gap-2 overflow-x-auto">
						{STATUS_FILTERS.map((filter) => (
							<button
								key={filter.label}
								type="button"
								onClick={() => {
									setPage(1);
									setStatusFilter(filter.value);
								}}
								className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
									statusFilter === filter.value
										? "bg-brand-green text-white"
										: "text-gray-500 hover:bg-gray-100"
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>

				{errorMessage && (
					<div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{errorMessage}
					</div>
				)}

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Order ID
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Buyer
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Sellers
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Items
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Qty
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Total
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Payment
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Date
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									View
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<tr>
									<td colSpan={10} className="px-4 py-10 text-center text-sm text-gray-500">
										Loading orders...
									</td>
								</tr>
							) : orders.length === 0 ? (
								<tr>
									<td colSpan={10} className="px-4 py-10 text-center text-sm text-gray-500">
										No orders match the current filters.
									</td>
								</tr>
							) : (
								orders.map((order) => (
									<Fragment key={order._id}>
										<tr
											className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
										>
											<td className="px-4 py-3 text-sm font-mono text-brand-green font-semibold">
												{order.checkoutReference}
											</td>
											<td className="px-4 py-3 text-sm text-gray-700">
												{getBuyerLabel(order)}
											</td>
											<td className="px-4 py-3 text-sm text-gray-700 max-w-44">
												<div className="line-clamp-2">{getSellerSummary(order)}</div>
											</td>
											<td className="px-4 py-3 text-sm text-gray-600 max-w-52">
												<div className="line-clamp-2">
													{getProductSummary(order)}
													{order.items.length > 2 ? ` +${order.items.length - 2} more` : ""}
												</div>
											</td>
											<td className="px-4 py-3 text-sm text-gray-600">
												{order.itemCount.toLocaleString("en-US")}
											</td>
											<td className="px-4 py-3 text-sm font-semibold text-brand-dark">
												{formatCurrency(order.totalPrice)}
											</td>
											<td className="px-4 py-3">
												<select
													value={order.status}
													disabled={updatingOrderId === order._id}
													onChange={(event) =>
														handleStatusChange(
															order._id,
															event.target.value as AdminOrderStatus,
														)
													}
													className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${getStatusBadge(order.status)}`}
												>
													{Object.entries(STATUS_LABELS).map(([value, label]) => (
														<option key={value} value={value}>
															{label}
														</option>
													))}
												</select>
											</td>
											<td className="px-4 py-3">
												<span
													className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPaymentBadge(order.paymentStatus)}`}
												>
													{order.paymentStatus === "paid"
														? "Paid"
														: order.paymentStatus === "pending"
															? "Pending"
															: "Failed"}
												</span>
											</td>
											<td className="px-4 py-3 text-sm text-gray-500">
												{formatDate(order.createdAt)}
											</td>
											<td className="px-4 py-3">
												<button
													type="button"
													onClick={() =>
														setExpandedOrderId((current) =>
															current === order._id ? null : order._id,
														)
													}
													className="inline-flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
												>
													<Eye className="w-4 h-4" />
													{expandedOrderId === order._id ? (
														<ChevronUp className="w-4 h-4" />
													) : (
														<ChevronDown className="w-4 h-4" />
													)}
												</button>
											</td>
										</tr>
										{expandedOrderId === order._id && (
											<tr className="bg-gray-50/60">
												<td colSpan={10} className="px-4 py-4">
													<div className="rounded-lg border border-gray-200 bg-white p-4">
														<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
															<div>
																<p className="text-xs uppercase text-gray-500 font-semibold">
																	Buyer
																</p>
																<p className="text-sm text-gray-800 mt-1">
																	{getBuyerLabel(order)}
																</p>
															</div>
															<div>
																<p className="text-xs uppercase text-gray-500 font-semibold">
																	Reference
																</p>
																<p className="text-sm text-gray-800 mt-1">
																	{order.checkoutReference}
																</p>
															</div>
															<div>
																<p className="text-xs uppercase text-gray-500 font-semibold">
																	Note
																</p>
																<p className="text-sm text-gray-800 mt-1">
																	{order.note || "No note provided"}
																</p>
															</div>
														</div>

														<div className="overflow-x-auto">
															<table className="w-full">
																<thead>
																	<tr className="border-b border-gray-100">
																		<th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
																			Product
																		</th>
																		<th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
																			Seller
																		</th>
																		<th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
																			Qty
																		</th>
																		<th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
																			Unit Price
																		</th>
																		<th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
																			Line Total
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{order.items.map((item, index) => (
																		<tr
																			key={`${order._id}-${item.productName}-${index}`}
																			className="border-b border-gray-50 last:border-b-0"
																		>
																			<td className="py-3 text-sm text-gray-700">
																				{item.productName}
																			</td>
																			<td className="py-3 text-sm text-gray-600">
																				{item.sellerName}
																			</td>
																			<td className="py-3 text-sm text-gray-600">
																				{item.quantity} {item.unit.toLowerCase()}
																			</td>
																			<td className="py-3 text-sm text-gray-600">
																				{formatCurrency(item.unitPrice)}
																			</td>
																			<td className="py-3 text-sm font-semibold text-brand-dark">
																				{formatCurrency(item.lineTotal)}
																			</td>
																		</tr>
																	))}
																</tbody>
															</table>
														</div>
													</div>
												</td>
											</tr>
										)}
									</Fragment>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
					<p className="text-sm text-gray-500">
						Page {page} of {pages}
					</p>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={page <= 1}
							className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
						>
							Previous
						</button>
						<button
							type="button"
							onClick={() => setPage((current) => Math.min(pages, current + 1))}
							disabled={page >= pages}
							className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
