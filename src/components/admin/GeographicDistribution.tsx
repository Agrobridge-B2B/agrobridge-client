import { MapPin } from "lucide-react";

const regions = [
	{ name: "West Africa", users: 5420, color: "bg-brand-green" },
	{ name: "East Africa", users: 3845, color: "bg-emerald-500" },
	{ name: "North Africa", users: 2180, color: "bg-yellow-500" },
	{ name: "Europe", users: 3240, color: "bg-blue-500" },
	{ name: "Southern Africa", users: 1400, color: "bg-purple-500" },
	{ name: "North America", users: 1560, color: "bg-gray-400" },
];

const maxUsers = Math.max(...regions.map((r) => r.users));

export function GeographicDistribution() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<h3 className="text-lg font-bold text-brand-dark mb-6">
				Geographic Distribution
			</h3>
			<div className="space-y-4">
				{regions.map((region) => (
					<div key={region.name} className="flex items-center gap-3">
						<MapPin className="w-4 h-4 text-gray-400 shrink-0" />
						<span className="text-sm text-gray-700 w-32 shrink-0">
							{region.name}
						</span>
						<div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
							<div
								className={`h-full rounded-full ${region.color} transition-all duration-500`}
								style={{
									width: `${(region.users / maxUsers) * 100}%`,
								}}
							/>
						</div>
						<span className="text-sm font-semibold text-brand-dark w-12 text-right">
							{region.users.toLocaleString()}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
