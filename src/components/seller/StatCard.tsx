"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
	title: string;
	value: string | number;
	subtitle: string;
	icon: LucideIcon;
	iconBgColor: string;
	iconColor: string;
	trend?: {
		value: string;
		isPositive: boolean;
	};
}

export function StatCard({
	title,
	value,
	subtitle,
	icon: Icon,
	iconBgColor,
	iconColor,
	trend,
}: StatCardProps) {
	return (
		<div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
			<div className="flex items-start justify-between mb-4">
				<div className={cn("p-3 rounded-lg", iconBgColor)}>
					<Icon className={cn("w-6 h-6", iconColor)} />
				</div>
				{trend && (
					<span
						className={cn(
							"text-sm font-medium flex items-center gap-1",
							trend.isPositive ? "text-green-600" : "text-red-600"
						)}
					>
						{trend.isPositive ? "↗" : "↘"} {trend.value}
					</span>
				)}
			</div>
			<div>
				<p className="text-sm text-gray-600 mb-1">{title}</p>
				<p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
				<p className="text-xs text-gray-500">{subtitle}</p>
			</div>
		</div>
	);
}
