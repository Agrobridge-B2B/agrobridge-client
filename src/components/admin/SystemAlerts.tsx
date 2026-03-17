import { AlertTriangle, ShieldAlert, ServerCrash, X } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
	{
		icon: ShieldAlert,
		iconColor: "text-red-500",
		bgColor: "bg-red-50 border-red-100",
		title: "Suspicious Activity Detected",
		description: "Multiple failed login attempts from IP 192.168.1.45",
		severity: "critical",
	},
	{
		icon: AlertTriangle,
		iconColor: "text-yellow-500",
		bgColor: "bg-yellow-50 border-yellow-100",
		title: "High Server Load",
		description: "CPU usage exceeded 85% threshold",
		severity: "warning",
	},
	{
		icon: ServerCrash,
		iconColor: "text-orange-500",
		bgColor: "bg-orange-50 border-orange-100",
		title: "Payment Gateway Timeout",
		description: "Stripe API response time exceeding 5s",
		severity: "warning",
	},
];

export function SystemAlerts() {
	return (
		<div className="bg-white rounded-xl border border-gray-100 p-6">
			<div className="flex items-center justify-between mb-5">
				<h3 className="text-lg font-bold text-brand-dark">System Alerts</h3>
				<span className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
					{alerts.length}
				</span>
			</div>
			<div className="space-y-3">
				{alerts.map((alert, index) => {
					const Icon = alert.icon;
					return (
						<div
							key={index}
							className={cn(
								"flex items-start gap-3 p-3 rounded-lg border",
								alert.bgColor,
							)}
						>
							<Icon
								className={cn("w-5 h-5 shrink-0 mt-0.5", alert.iconColor)}
							/>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold text-brand-dark">
									{alert.title}
								</p>
								<p className="text-xs text-gray-500">{alert.description}</p>
							</div>
							<button
								type="button"
								className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
