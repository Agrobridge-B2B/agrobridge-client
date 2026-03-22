"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ProfileSettings } from "@/components/seller/ProfileSettings";
import { CertificationRequest } from "@/components/seller/CertificationRequest";
import { User, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
	{ id: "profile", label: "Profil", icon: User },
	{ id: "certification", label: "Certification", icon: ShieldCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

function SettingsContent() {
	const [activeTab, setActiveTab] = useState<TabId>("profile");

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
				<p className="text-sm text-gray-500 mt-1">
					Gérez votre profil et votre certification vendeur
				</p>
			</div>

			{/* Tabs */}
			<div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
								activeTab === tab.id
									? "bg-white text-gray-900 shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							)}
						>
							<Icon className="w-4 h-4" />
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Tab Content */}
			{activeTab === "profile" && <ProfileSettings />}
			{activeTab === "certification" && <CertificationRequest />}
		</div>
	);
}

export default function SellerSettingsPage() {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<SettingsContent />
		</ProtectedRoute>
	);
}
