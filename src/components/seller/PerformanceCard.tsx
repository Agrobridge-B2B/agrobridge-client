"use client";

interface PerformanceMetric {
	label: string;
	value: string | number;
	trend?: {
		value: string;
		isPositive: boolean;
	};
}

const metrics: PerformanceMetric[] = [
	{
		label: "Vues Totales",
		value: "1,234",
		trend: { value: "+12%", isPositive: true },
	},
	{
		label: "Demandes de Contact",
		value: "47",
		trend: { value: "+8%", isPositive: true },
	},
	{
		label: "Commandes Complétées",
		value: "12",
		trend: { value: "+15%", isPositive: true },
	},
];

export function PerformanceCard() {
	return (
		<div className="bg-white rounded-xl border border-gray-200 p-6">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">
					Performance du Mois
				</h2>
				<p className="text-sm text-gray-500">Octobre 2025</p>
			</div>

			<div className="space-y-4">
				{metrics.map((metric, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
					>
						<div>
							<p className="text-sm text-gray-600 mb-1">{metric.label}</p>
							<p className="text-2xl font-bold text-gray-900">{metric.value}</p>
						</div>
						{metric.trend && (
							<div
								className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
									metric.trend.isPositive
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								<span>{metric.trend.isPositive ? "↗" : "↘"}</span>
								<span>{metric.trend.value}</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
