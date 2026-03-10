"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
	{ name: "Fruits", value: 34, color: "#78C841" },
	{ name: "Vegetables", value: 25, color: "#4CAF50" },
	{ name: "Cereals", value: 20, color: "#FF9800" },
	{ name: "Legumes", value: 12, color: "#F44336" },
	{ name: "Others", value: 9, color: "#9C27B0" },
];

export function CategoryDistributionChart() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<h3 className="text-lg font-bold text-brand-dark mb-6">
				Product Categories Distribution
			</h3>
			<div className="h-[220px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={55}
							outerRadius={90}
							paddingAngle={3}
							dataKey="value"
							stroke="none"
						>
							{data.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "#fff",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
							}}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							formatter={(value: any, name: any) => [`${value}%`, name]}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
			{/* Legend */}
			<div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
				{data.map((item) => (
					<div key={item.name} className="flex items-center gap-1.5">
						<div
							className="w-2.5 h-2.5 rounded-full"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-xs text-gray-600">
							{item.name} {item.value}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
