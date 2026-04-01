"use client";

import type { SellerOrderSummary } from "@/lib/seller";

interface PerformanceCardProps {
	summary: SellerOrderSummary;
}

export function PerformanceCard({ summary }: PerformanceCardProps) {
	const metrics = [
		{
			label: "Revenu commandes",
			value: summary.totalRevenue.toLocaleString("fr-FR", {
				style: "currency",
				currency: "EUR",
			}),
		},
		{
			label: "Produits vendus",
			value: summary.productsSold,
		},
		{
			label: "Commandes completees",
			value: summary.completedOrders,
		},
	];

	return (
		<div className="bg-white rounded-xl border border-gray-200 p-6">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">
					Performance du Mois
				</h2>
				<p className="text-sm text-gray-500">Resume en temps reel</p>
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
						<div className="px-3 py-1 rounded-full text-sm font-medium bg-brand-green/10 text-brand-green">
							Live
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
