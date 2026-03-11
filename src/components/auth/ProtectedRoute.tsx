"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: ("buyer" | "seller" | "admin")[];
}

function getRoleDashboard(role: "buyer" | "seller" | "admin"): string {
	switch (role) {
		case "admin":
			return "/agro-admin";
		case "seller":
			return "/seller/dashboard";
		case "buyer":
			return "/buyer/dashboard";
		default:
			return "/";
	}
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
	const { user, isLoading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.replace("/login");
		}

		if (!isLoading && isAuthenticated && allowedRoles && user) {
			if (!allowedRoles.includes(user.role)) {
				// Redirect to user's role-appropriate dashboard
				router.replace(getRoleDashboard(user.role));
			}
		}
	}, [isLoading, isAuthenticated, user, allowedRoles, router]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loader2 className="w-10 h-10 text-brand-green animate-spin" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	if (allowedRoles && user && !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
}
