import {
	ShoppingCart,
	DollarSign,
	Clock,
	CheckCircle,
	XCircle,
	Search,
	Filter,
	Eye,
} from "lucide-react";

const stats = [
	{
		label: "Total Orders",
		value: "5,632",
		icon: ShoppingCart,
		color: "bg-blue-100 text-blue-600",
	},
	{
		label: "Revenue",
		value: "$892,450",
		icon: DollarSign,
		color: "bg-green-100 text-green-600",
	},
	{
		label: "Pending",
		value: "127",
		icon: Clock,
		color: "bg-yellow-100 text-yellow-600",
	},
	{
		label: "Completed",
		value: "5,124",
		icon: CheckCircle,
		color: "bg-emerald-100 text-emerald-600",
	},
];

const orders = [
	{
		id: "AG-2845",
		buyer: "EuroFoods France",
		seller: "AgriTech Ghana",
		product: "Fresh Mangoes",
		qty: "2,000 kg",
		total: "$5,000",
		status: "Delivered",
		payment: "Paid",
		date: "2024-10-15",
	},
	{
		id: "AG-2844",
		buyer: "Fresh Import UK",
		seller: "Kenya Farms Co.",
		product: "Avocados",
		qty: "800 kg",
		total: "$4,400",
		status: "In Transit",
		payment: "Paid",
		date: "2024-10-14",
	},
	{
		id: "AG-2843",
		buyer: "BioMarket Germany",
		seller: "EcoFarm Morocco",
		product: "Basmati Rice",
		qty: "5,000 kg",
		total: "$16,000",
		status: "Processing",
		payment: "Pending",
		date: "2024-10-14",
	},
	{
		id: "AG-2842",
		buyer: "MedFood Spain",
		seller: "Nigeria Produce",
		product: "Green Lentils",
		qty: "3,000 kg",
		total: "$8,400",
		status: "Delivered",
		payment: "Paid",
		date: "2024-10-13",
	},
	{
		id: "AG-2841",
		buyer: "NordicTrade AB",
		seller: "Tanzania Trade",
		product: "Sweet Potatoes",
		qty: "1,500 kg",
		total: "$2,700",
		status: "Cancelled",
		payment: "Refunded",
		date: "2024-10-12",
	},
	{
		id: "AG-2840",
		buyer: "EuroFoods France",
		seller: "Uganda Exports",
		product: "Cherry Tomatoes",
		qty: "500 kg",
		total: "$2,000",
		status: "Delivered",
		payment: "Paid",
		date: "2024-10-11",
	},
	{
		id: "AG-2839",
		buyer: "Fresh Import UK",
		seller: "AgriTech Ghana",
		product: "Organic Cocoa Beans",
		qty: "1,000 kg",
		total: "$8,000",
		status: "In Transit",
		payment: "Paid",
		date: "2024-10-10",
	},
];

export default function OrdersPaymentsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">
					Orders & Payments
				</h1>
				<p className="text-sm text-gray-500 mt-1">
					Track orders, manage payments, and monitor transaction flow
				</p>
			</div>

			{/* Stats */}
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
								<p className="text-lg font-bold text-brand-dark">
									{stat.value}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Orders Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="relative w-72">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search orders..."
								className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
							/>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{["All", "Processing", "In Transit", "Delivered", "Cancelled"].map(
							(filter) => (
								<button
									key={filter}
									type="button"
									className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
										filter === "All"
											? "bg-brand-green text-white"
											: "text-gray-500 hover:bg-gray-100"
									}`}
								>
									{filter}
								</button>
							),
						)}
					</div>
				</div>
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
									Seller
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Product
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
							{orders.map((order) => (
								<tr
									key={order.id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3 text-sm font-mono text-brand-green font-semibold">
										{order.id}
									</td>
									<td className="px-4 py-3 text-sm text-gray-700">
										{order.buyer}
									</td>
									<td className="px-4 py-3 text-sm text-gray-700">
										{order.seller}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{order.product}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{order.qty}
									</td>
									<td className="px-4 py-3 text-sm font-semibold text-brand-dark">
										{order.total}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												order.status === "Delivered"
													? "bg-green-100 text-green-700"
													: order.status === "In Transit"
														? "bg-blue-100 text-blue-700"
														: order.status === "Processing"
															? "bg-yellow-100 text-yellow-700"
															: "bg-red-100 text-red-700"
											}`}
										>
											{order.status}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												order.payment === "Paid"
													? "bg-emerald-100 text-emerald-700"
													: order.payment === "Pending"
														? "bg-yellow-100 text-yellow-700"
														: "bg-gray-100 text-gray-700"
											}`}
										>
											{order.payment}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{order.date}
									</td>
									<td className="px-4 py-3">
										<button
											type="button"
											className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
										>
											<Eye className="w-4 h-4" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
