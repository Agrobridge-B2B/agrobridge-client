import {
	FileText,
	Star,
	AlertTriangle,
	CheckCircle,
	Flag,
	Search,
	Filter,
	Eye,
	Trash2,
} from "lucide-react";

const stats = [
	{
		label: "Total Reviews",
		value: "4,281",
		icon: Star,
		color: "bg-yellow-100 text-yellow-600",
	},
	{
		label: "Approved",
		value: "3,956",
		icon: CheckCircle,
		color: "bg-green-100 text-green-600",
	},
	{
		label: "Pending",
		value: "198",
		icon: FileText,
		color: "bg-blue-100 text-blue-600",
	},
	{
		label: "Flagged",
		value: "127",
		icon: Flag,
		color: "bg-red-100 text-red-600",
	},
];

const reviews = [
	{
		id: "RV-001",
		product: "Fresh Mangoes",
		reviewer: "EuroFoods France",
		rating: 5,
		comment:
			"Excellent quality, delivered on time. The mangoes were perfectly ripe.",
		status: "Approved",
		date: "2024-10-15",
	},
	{
		id: "RV-002",
		product: "Basmati Rice",
		reviewer: "BioMarket Germany",
		rating: 4,
		comment: "Good quality rice, packaging could be improved for long transit.",
		status: "Approved",
		date: "2024-10-14",
	},
	{
		id: "RV-003",
		product: "Organic Cocoa Beans",
		reviewer: "Fresh Import UK",
		rating: 2,
		comment: "Product description was misleading. Quality below expectations.",
		status: "Flagged",
		date: "2024-10-14",
	},
	{
		id: "RV-004",
		product: "Avocados",
		reviewer: "MedFood Spain",
		rating: 5,
		comment: "Premium avocados, our clients loved them. Will order again.",
		status: "Approved",
		date: "2024-10-13",
	},
	{
		id: "RV-005",
		product: "Cherry Tomatoes",
		reviewer: "NordicTrade AB",
		rating: 1,
		comment: "Arrived damaged, half of the shipment was unusable.",
		status: "Flagged",
		date: "2024-10-12",
	},
	{
		id: "RV-006",
		product: "Green Lentils",
		reviewer: "EuroFoods France",
		rating: 4,
		comment: "Consistent quality, fair pricing. Good seller communication.",
		status: "Pending",
		date: "2024-10-11",
	},
];

const reports = [
	{
		id: "RPT-001",
		type: "Product Violation",
		subject: "Misleading organic certification on Cocoa Beans",
		reporter: "Fresh Import UK",
		status: "Under Review",
		priority: "High",
		date: "2024-10-15",
	},
	{
		id: "RPT-002",
		type: "Seller Complaint",
		subject: "Delayed shipment - Order AG-2830",
		reporter: "BioMarket Germany",
		status: "Under Review",
		priority: "Medium",
		date: "2024-10-14",
	},
	{
		id: "RPT-003",
		type: "Quality Issue",
		subject: "Cherry Tomatoes arrived damaged and spoiled",
		reporter: "NordicTrade AB",
		status: "Resolved",
		priority: "High",
		date: "2024-10-12",
	},
	{
		id: "RPT-004",
		type: "Payment Dispute",
		subject: "Overcharged on Order AG-2825",
		reporter: "MedFood Spain",
		status: "Under Review",
		priority: "Low",
		date: "2024-10-10",
	},
];

function StarRating({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
				/>
			))}
		</div>
	);
}

export default function ReviewsReportsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">
					Reviews & Reports
				</h1>
				<p className="text-sm text-gray-500 mt-1">
					Moderate reviews and handle user reports
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

			{/* Reviews Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<h2 className="text-lg font-bold text-brand-dark">Product Reviews</h2>
					<div className="flex items-center gap-2">
						<div className="relative w-56">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search reviews..."
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
									Product
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Reviewer
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Rating
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 max-w-xs">
									Comment
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Date
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review) => (
								<tr
									key={review.id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3 text-sm font-medium text-brand-dark">
										{review.product}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{review.reviewer}
									</td>
									<td className="px-4 py-3">
										<StarRating rating={review.rating} />
									</td>
									<td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
										{review.comment}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												review.status === "Approved"
													? "bg-green-100 text-green-700"
													: review.status === "Flagged"
														? "bg-red-100 text-red-700"
														: "bg-blue-100 text-blue-700"
											}`}
										>
											{review.status}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{review.date}
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
												className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Reports Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<h2 className="text-lg font-bold text-brand-dark">User Reports</h2>
					<div className="flex items-center gap-2">
						{["All", "Under Review", "Resolved"].map((filter) => (
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
						))}
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Report ID
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Type
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Subject
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Reporter
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Priority
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((report) => (
								<tr
									key={report.id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3 text-sm font-mono text-brand-green font-semibold">
										{report.id}
									</td>
									<td className="px-4 py-3">
										<span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
											{report.type}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
										{report.subject}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{report.reporter}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												report.priority === "High"
													? "bg-red-100 text-red-700"
													: report.priority === "Medium"
														? "bg-yellow-100 text-yellow-700"
														: "bg-gray-100 text-gray-600"
											}`}
										>
											{report.priority}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												report.status === "Resolved"
													? "bg-green-100 text-green-700"
													: "bg-blue-100 text-blue-700"
											}`}
										>
											{report.status}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{report.date}
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
