import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
	iconBg: string;
	iconColor: string;
}

export function StatCard({
	title,
	value,
	change,
	icon: Icon,
	iconBg,
	iconColor,
}: StatCardProps) {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
			<div
				className={cn(
					"w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
					iconBg,
				)}
			>
				<Icon className={cn("w-6 h-6", iconColor)} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-0.5">
					<p className="text-xs text-gray-500 truncate">{title}</p>
					<span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500 whitespace-nowrap">
						<TrendingUp className="w-3 h-3" />
						{change}
					</span>
				</div>
				<p className="text-xl font-bold text-brand-dark">{value}</p>
			</div>
		</div>
	);
}
