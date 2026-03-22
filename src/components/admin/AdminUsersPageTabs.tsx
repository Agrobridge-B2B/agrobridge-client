"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	activeTab: string;
	usersCount: number;
	certsCount: number;
}

export function AdminUsersPageTabs({ activeTab, usersCount, certsCount }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	function switchTab(tab: string) {
		const params = new URLSearchParams(searchParams.toString());
		if (tab === "users") {
			params.delete("tab");
		} else {
			params.set("tab", tab);
		}
		router.push(`/agro-admin/agro-users?${params.toString()}`);
	}

	return (
		<div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
			<button
				onClick={() => switchTab("users")}
				className={cn(
					"flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
					activeTab === "users"
						? "bg-white text-gray-900 shadow-sm"
						: "text-gray-500 hover:text-gray-700"
				)}
			>
				<Users className="w-4 h-4" />
				Utilisateurs
				<span
					className={cn(
						"text-xs px-1.5 py-0.5 rounded-full",
						activeTab === "users"
							? "bg-brand-green/10 text-brand-green"
							: "bg-gray-200 text-gray-500"
					)}
				>
					{usersCount}
				</span>
			</button>
			<button
				onClick={() => switchTab("certifications")}
				className={cn(
					"flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
					activeTab === "certifications"
						? "bg-white text-gray-900 shadow-sm"
						: "text-gray-500 hover:text-gray-700"
				)}
			>
				<ShieldCheck className="w-4 h-4" />
				Certifications
				<span
					className={cn(
						"text-xs px-1.5 py-0.5 rounded-full",
						activeTab === "certifications"
							? "bg-brand-green/10 text-brand-green"
							: "bg-gray-200 text-gray-500"
					)}
				>
					{certsCount}
				</span>
			</button>
		</div>
	);
}
