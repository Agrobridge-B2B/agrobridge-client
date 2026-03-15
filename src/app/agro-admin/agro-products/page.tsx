import { Package, Plus, Search, Filter, MoreVertical, Eye } from "lucide-react";

const products = [
	{
		id: "PRD-001",
		name: "Fresh Mangoes",
		category: "Fruits",
		seller: "AgriTech Ghana",
		price: "$2.50/kg",
		stock: "500 kg",
		status: "Active",
		image: "🥭",
	},
	{
		id: "PRD-002",
		name: "Organic Cocoa Beans",
		category: "Others",
		seller: "Kenya Farms Co.",
		price: "$8.00/kg",
		stock: "2,000 kg",
		status: "Active",
		image: "🫘",
	},
	{
		id: "PRD-003",
		name: "Basmati Rice",
		category: "Cereals",
		seller: "EcoFarm Morocco",
		price: "$3.20/kg",
		stock: "10,000 kg",
		status: "Active",
		image: "🌾",
	},
	{
		id: "PRD-004",
		name: "Cherry Tomatoes",
		category: "Vegetables",
		seller: "Uganda Exports",
		price: "$4.00/kg",
		stock: "300 kg",
		status: "Low Stock",
		image: "🍅",
	},
	{
		id: "PRD-005",
		name: "Green Lentils",
		category: "Legumes",
		seller: "Nigeria Produce",
		price: "$2.80/kg",
		stock: "5,000 kg",
		status: "Active",
		image: "🫛",
	},
	{
		id: "PRD-006",
		name: "Avocados",
		category: "Fruits",
		seller: "Kenya Farms Co.",
		price: "$5.50/kg",
		stock: "800 kg",
		status: "Active",
		image: "🥑",
	},
	{
		id: "PRD-007",
		name: "Dried Hibiscus",
		category: "Others",
		seller: "Nigeria Produce",
		price: "$12.00/kg",
		stock: "0 kg",
		status: "Out of Stock",
		image: "🌺",
	},
	{
		id: "PRD-008",
		name: "Sweet Potatoes",
		category: "Vegetables",
		seller: "Tanzania Trade",
		price: "$1.80/kg",
		stock: "3,500 kg",
		status: "Active",
		image: "🍠",
	},
];

const categories = [
	{ name: "Fruits", count: 2845, color: "bg-green-100 text-green-700" },
	{ name: "Vegetables", count: 2113, color: "bg-orange-100 text-orange-700" },
	{ name: "Cereals", count: 1690, color: "bg-yellow-100 text-yellow-700" },
	{ name: "Legumes", count: 1014, color: "bg-red-100 text-red-700" },
	{ name: "Others", count: 794, color: "bg-purple-100 text-purple-700" },
];

export default function ProductsManagementPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-brand-dark">
						Products Management
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Browse, manage, and moderate all listed products
					</p>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green-dark transition-colors"
				>
					<Plus className="w-4 h-4" />
					Add Product
				</button>
			</div>

			{/* Category Pills */}
			<div className="flex flex-wrap gap-3">
				<div className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-medium">
					All Products <span className="ml-1 opacity-80">8,456</span>
				</div>
				{categories.map((cat) => (
					<div
						key={cat.name}
						className={`${cat.color} px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity`}
					>
						{cat.name}{" "}
						<span className="ml-1 opacity-70">
							{cat.count.toLocaleString()}
						</span>
					</div>
				))}
			</div>

			{/* Products Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<div className="relative w-72">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search products..."
							className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
						/>
					</div>
					<button
						type="button"
						className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
					>
						<Filter className="w-4 h-4" />
						Filter
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Product
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Category
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Seller
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Price
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Stock
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr
									key={product.id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<span className="text-2xl">{product.image}</span>
											<div>
												<p className="text-sm font-medium text-brand-dark">
													{product.name}
												</p>
												<p className="text-xs text-gray-400">{product.id}</p>
											</div>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{product.category}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{product.seller}
									</td>
									<td className="px-4 py-3 text-sm font-semibold text-brand-dark">
										{product.price}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{product.stock}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												product.status === "Active"
													? "bg-green-100 text-green-700"
													: product.status === "Low Stock"
														? "bg-yellow-100 text-yellow-700"
														: "bg-red-100 text-red-700"
											}`}
										>
											{product.status}
										</span>
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-1">
											<button
												type="button"
												className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
											>
												<Eye className="w-4 h-4" />
											</button>
											<button
												type="button"
												className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
											>
												<MoreVertical className="w-4 h-4" />
											</button>
										</div>
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
