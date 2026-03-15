"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart,
} from "recharts";

const data = [
	{ month: "Jan", revenue: 45000 },
	{ month: "Feb", revenue: 52000 },
	{ month: "Mar", revenue: 48000 },
	{ month: "Apr", revenue: 61000 },
	{ month: "May", revenue: 55000 },
	{ month: "Jun", revenue: 67000 },
	{ month: "Jul", revenue: 72000 },
	{ month: "Aug", revenue: 78000 },
	{ month: "Sep", revenue: 85000 },
	{ month: "Oct", revenue: 92000 },
];

export function MonthlyRevenueChart() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<h3 className="text-lg font-bold text-brand-dark mb-6">
				Monthly Revenue
			</h3>
			<div className="h-[280px]">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data}>
						<defs>
							<linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#78C841" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#78C841" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#9CA3AF", fontSize: 12 }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#9CA3AF", fontSize: 12 }}
							tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
						<Area
							type="monotone"
							dataKey="revenue"
							stroke="#78C841"
							strokeWidth={2.5}
							fill="url(#revenueGrad)"
							dot={{ fill: "#78C841", strokeWidth: 2, r: 4 }}
							activeDot={{ r: 6, strokeWidth: 0 }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
