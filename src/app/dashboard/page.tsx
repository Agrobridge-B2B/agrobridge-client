"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirect() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isLoading) return;

		if (!user) {
			router.replace("/login");
			return;
		}

		// Redirect based on user role
		switch (user.role) {
			case "admin":
				router.replace("/agro-admin/dashboard");
				break;
			case "seller":
				router.replace("/seller/dashboard");
				break;
			case "buyer":
				router.replace("/buyer/dashboard");
				break;
			default:
				router.replace("/login");
		}
	}, [user, isLoading, router]);

	// Return null to avoid flash of content
	return null;
}
