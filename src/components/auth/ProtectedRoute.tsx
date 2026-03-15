"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type UserRole = "admin" | "seller" | "buyer";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
	const { user, isLoading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isLoading) return;

		// Not authenticated - redirect to login
		if (!isAuthenticated || !user) {
			router.replace("/login");
			return;
		}

		// Authenticated but wrong role - show 404
		if (!allowedRoles.includes(user.role as UserRole)) {
			router.replace("/404");
			return;
		}
	}, [isAuthenticated, user, isLoading, allowedRoles, router]);

	// Show loading state while checking auth
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Chargement...</p>
				</div>
			</div>
		);
	}

	// Don't render if not authenticated or wrong role
	if (!isAuthenticated || !user || !allowedRoles.includes(user.role as UserRole)) {
		return null;
	}

	return <>{children}</>;
}
