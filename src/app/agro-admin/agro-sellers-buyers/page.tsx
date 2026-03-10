import {
	Store,
	ShoppingBag,
	TrendingUp,
	Star,
	Search,
	Filter,
} from "lucide-react";

const sellers = [
	{
		name: "AgriTech Ghana",
		products: 245,
		revenue: "$58,000",
		rating: 4.8,
		location: "Ghana",
		status: "Verified",
	},
	{
		name: "Kenya Farms Co.",
		products: 189,
		revenue: "$45,000",
		rating: 4.6,
		location: "Kenya",
		status: "Verified",
	},
	{
		name: "EcoFarm Morocco",
		products: 156,
		revenue: "$38,000",
		rating: 4.5,
		location: "Morocco",
		status: "Verified",
	},
	{
		name: "Uganda Exports",
		products: 132,
		revenue: "$32,000",
		rating: 4.3,
		location: "Uganda",
		status: "Pending",
	},
	{
		name: "Nigeria Produce",
		products: 98,
		revenue: "$25,000",
		rating: 4.1,
		location: "Nigeria",
		status: "Verified",
	},
];

const buyers = [
	{
		name: "EuroFoods France",
		orders: 89,
		spent: "$120,000",
		rating: 4.9,
		location: "France",
		status: "Premium",
	},
	{
		name: "Fresh Import UK",
		orders: 67,
		spent: "$95,000",
		rating: 4.7,
		location: "United Kingdom",
		status: "Premium",
	},
	{
		name: "BioMarket Germany",
		orders: 54,
		spent: "$78,000",
		rating: 4.5,
		location: "Germany",
		status: "Standard",
	},
	{
		name: "MedFood Spain",
		orders: 43,
		spent: "$62,000",
		rating: 4.4,
		location: "Spain",
		status: "Standard",
	},
	{
		name: "NordicTrade AB",
		orders: 38,
		spent: "$55,000",
		rating: 4.2,
		location: "Sweden",
		status: "Premium",
	},
];

export default function SellersBuyersPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">Sellers & Buyers</h1>
				<p className="text-sm text-gray-500 mt-1">
					Monitor and manage sellers and buyers on the platform
				</p>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[
					{
						label: "Total Sellers",
						value: "3,284",
						icon: Store,
						color: "bg-green-100 text-green-600",
					},
					{
						label: "Total Buyers",
						value: "9,561",
						icon: ShoppingBag,
						color: "bg-blue-100 text-blue-600",
					},
					{
						label: "Avg. Rating",
						value: "4.5",
						icon: Star,
						color: "bg-yellow-100 text-yellow-600",
					},
					{
						label: "Growth Rate",
						value: "+15.2%",
						icon: TrendingUp,
						color: "bg-emerald-100 text-emerald-600",
					},
				].map((stat) => {
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

			{/* Top Sellers Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<h2 className="text-lg font-bold text-brand-dark">Top Sellers</h2>
					<div className="flex items-center gap-2">
						<div className="relative w-56">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search sellers..."
								className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
							/>
						</div>
						<button
							type="button"
							className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
						>
							<Filter className="w-4 h-4" />
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Company
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Products
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Revenue
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Rating
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Location
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{sellers.map((seller) => (
								<tr
									key={seller.name}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-xs">
												{seller.name[0]}
											</div>
											<span className="text-sm font-medium text-brand-dark">
												{seller.name}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{seller.products}
									</td>
									<td className="px-4 py-3 text-sm font-semibold text-brand-dark">
										{seller.revenue}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-1">
											<Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
											<span className="text-sm text-gray-600">
												{seller.rating}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{seller.location}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												seller.status === "Verified"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{seller.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Top Buyers Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<h2 className="text-lg font-bold text-brand-dark">Top Buyers</h2>
					<div className="flex items-center gap-2">
						<div className="relative w-56">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search buyers..."
								className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
							/>
						</div>
						<button
							type="button"
							className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
						>
							<Filter className="w-4 h-4" />
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Company
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Orders
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Total Spent
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Rating
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Location
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{buyers.map((buyer) => (
								<tr
									key={buyer.name}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
												{buyer.name[0]}
											</div>
											<span className="text-sm font-medium text-brand-dark">
												{buyer.name}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{buyer.orders}
									</td>
									<td className="px-4 py-3 text-sm font-semibold text-brand-dark">
										{buyer.spent}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-1">
											<Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
											<span className="text-sm text-gray-600">
												{buyer.rating}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{buyer.location}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												buyer.status === "Premium"
													? "bg-purple-100 text-purple-700"
													: "bg-gray-100 text-gray-700"
											}`}
										>
											{buyer.status}
										</span>
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
