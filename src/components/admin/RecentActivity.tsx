import {
	Package,
	UserPlus,
	ShoppingCart,
	AlertTriangle,
	CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
	{
		icon: Package,
		iconBg: "bg-orange-100",
		iconColor: "text-orange-500",
		title: "New product published",
		description: "Fresh Mangoes from Ghana - 500kg available",
		time: "2 minutes ago",
	},
	{
		icon: UserPlus,
		iconBg: "bg-blue-100",
		iconColor: "text-blue-500",
		title: "New seller registered",
		description: "EcoFarm Morocco joined the platform",
		time: "15 minutes ago",
	},
	{
		icon: ShoppingCart,
		iconBg: "bg-green-100",
		iconColor: "text-green-500",
		title: "Order completed",
		description: "Order #AG-2845 - 2T Rice to Europe",
		time: "1 hour ago",
	},
	{
		icon: CheckCircle,
		iconBg: "bg-emerald-100",
		iconColor: "text-emerald-500",
		title: "Payment confirmed",
		description: "$12,500 received for Order #AG-2839",
		time: "2 hours ago",
	},
	{
		icon: AlertTriangle,
		iconBg: "bg-yellow-100",
		iconColor: "text-yellow-600",
		title: "Product review flagged",
		description: "Review on 'Organic Cocoa Beans' needs moderation",
		time: "3 hours ago",
	},
];

export function RecentActivity() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<h3 className="text-lg font-bold text-brand-dark mb-5">
				Recent Activity
			</h3>
			<div className="space-y-4">
				{activities.map((activity, index) => {
					const Icon = activity.icon;
					return (
						<div
							key={index}
							className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
						>
							<div
								className={cn(
									"w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
									activity.iconBg,
								)}
							>
								<Icon className={cn("w-4 h-4", activity.iconColor)} />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold text-brand-dark">
									{activity.title}
								</p>
								<p className="text-xs text-gray-500 truncate">
									{activity.description}
								</p>
							</div>
							<span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
								{activity.time}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
