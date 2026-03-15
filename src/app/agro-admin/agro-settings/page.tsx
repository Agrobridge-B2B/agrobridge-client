"use client";

import { User, Bell, Shield, Globe, Save, Upload, Camera } from "lucide-react";
import { useState } from "react";

const settingsSections = [
	{
		title: "Profile Settings",
		icon: User,
		description: "Manage your admin profile and account details",
		hasProfileImage: true,
		fields: [
			{ label: "Full Name", value: "Admin User", type: "text" },
			{ label: "Email", value: "admin@agrobridge.com", type: "email" },
			{ label: "Phone", value: "+212 XXX XXX XXX", type: "tel" },
			{ label: "Role", value: "Super Administrator", type: "text" },
		],
	},
	{
		title: "Notification Settings",
		icon: Bell,
		description: "Configure how and when you receive notifications",
		toggles: [
			{ label: "Email notifications for new orders", enabled: true },
			{ label: "SMS alerts for high-priority reports", enabled: true },
			{ label: "Push notifications for new user registrations", enabled: false },
			{ label: "Weekly summary email", enabled: true },
			{ label: "Real-time payment alerts", enabled: true },
		],
	},
	{
		title: "Security Settings",
		icon: Shield,
		description: "Manage authentication and access control",
		toggles: [
			{ label: "Two-factor authentication", enabled: true },
			{ label: "Login alerts from new devices", enabled: true },
			{ label: "Session timeout after 30 minutes", enabled: false },
			{ label: "IP whitelist enforcement", enabled: false },
		],
	},
	{
		title: "Platform Settings",
		icon: Globe,
		description: "Configure global platform preferences",
		fields: [
			{ label: "Platform Name", value: "Agrobridge", type: "text" },
			{ label: "Support Email", value: "support@agrobridge.com", type: "email" },
			{ label: "Default Currency", value: "USD ($)", type: "text" },
			{ label: "Default Language", value: "French (FR)", type: "text" },
		],
	},
];

export default function SettingsPage() {
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">Settings</h1>
				<p className="text-sm text-gray-500 mt-1">Manage your admin account and platform configuration</p>
			</div>

			{/* Settings Sections */}
			<div className="space-y-6">
				{settingsSections.map((section) => {
					const Icon = section.icon;
					return (
						<div key={section.title} className="bg-white rounded-xl border border-gray-100">
							{/* Section Header */}
							<div className="flex items-center gap-3 p-5 border-b border-gray-100">
								<div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
									<Icon className="w-5 h-5 text-brand-green" />
								</div>
								<div>
									<h2 className="text-base font-bold text-brand-dark">{section.title}</h2>
									<p className="text-xs text-gray-500">{section.description}</p>
								</div>
							</div>

							{/* Section Content */}
							<div className="p-5">
								{section.hasProfileImage && (
									<div className="mb-6">
										<label className="text-xs font-medium text-gray-600 block mb-3">Profile Image</label>
										<div className="flex items-center gap-6">
											<div className="relative">
												{profileImage ? (
													<img
														src={profileImage}
														alt="Profile"
														className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
													/>
												) : (
													<div className="w-24 h-24 rounded-full bg-brand-green/10 flex items-center justify-center border-2 border-gray-200">
														<User className="w-10 h-10 text-brand-green" />
													</div>
												)}
												<label
													htmlFor="profile-upload"
													className="absolute bottom-0 right-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-green-dark transition-colors shadow-md"
												>
													<Camera className="w-4 h-4 text-white" />
												</label>
												<input
													id="profile-upload"
													type="file"
													accept="image/*"
													onChange={handleImageUpload}
													className="hidden"
												/>
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium text-brand-dark mb-1">Upload Profile Picture</p>
												<p className="text-xs text-gray-500 mb-3">JPG, PNG or GIF. Max size 2MB.</p>
												<label
													htmlFor="profile-upload-btn"
													className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
												>
													<Upload className="w-4 h-4" />
													Choose Image
												</label>
												<input
													id="profile-upload-btn"
													type="file"
													accept="image/*"
													onChange={handleImageUpload}
													className="hidden"
												/>
											</div>
										</div>
									</div>
								)}

								{section.fields && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{section.fields.map((field) => (
											<div key={field.label} className="space-y-1.5">
												<label className="text-xs font-medium text-gray-600">{field.label}</label>
												<input
													type={field.type}
													defaultValue={field.value}
													className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
												/>
											</div>
										))}
									</div>
								)}

								{section.toggles && (
									<div className="space-y-4">
										{section.toggles.map((toggle) => (
											<div key={toggle.label} className="flex items-center justify-between">
												<span className="text-sm text-gray-700">{toggle.label}</span>
												<button
													type="button"
													className={`relative w-11 h-6 rounded-full transition-colors ${
														toggle.enabled ? "bg-brand-green" : "bg-gray-300"
													}`}
												>
													<span
														className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
															toggle.enabled ? "translate-x-5" : "translate-x-0"
														}`}
													/>
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			
			<div className="flex justify-end">
				<button type="button" className="flex items-center gap-2 px-6 py-2.5 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm">
					<Save className="w-4 h-4" />
					Save Changes
				</button>
			</div>
		</div>
	);
}
