"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "AgriTech Ghana", revenue: 58000 },
	{ name: "Kenya Farms Co.", revenue: 45000 },
	{ name: "Uganda Exports", revenue: 38000 },
	{ name: "Nigeria Produce", revenue: 32000 },
	{ name: "Tanzania Trade", revenue: 25000 },
];

export function TopSellersChart() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<h3 className="text-lg font-bold text-brand-dark mb-6">
				Top 5 Sellers by Revenue
			</h3>
			<div className="h-[280px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} layout="vertical" barCategoryGap="20%">
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#f0f0f0"
							horizontal={false}
						/>
						<XAxis
							type="number"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#9CA3AF", fontSize: 12 }}
							tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
						/>
						<YAxis
							type="category"
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#6B7280", fontSize: 12 }}
							width={120}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#fff",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
							}}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							formatter={(value: any) => [
								`$${Number(value).toLocaleString()}`,
								"Revenue",
							]}
						/>
						<Bar
							dataKey="revenue"
							fill="#78C841"
							radius={[0, 6, 6, 0]}
							barSize={24}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
