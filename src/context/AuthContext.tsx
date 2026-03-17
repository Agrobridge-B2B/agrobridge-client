"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

type UserRole = "admin" | "seller" | "buyer";

interface User {
	id: string;
	email: string;
	fullName: string;
	role: UserRole;
	isVerified: boolean;
	country?: string;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_COOKIE_KEY = "agrobridge_user";
const COOKIE_OPTIONS = {
	expires: 7, // 7 days
	sameSite: "strict" as const,
	secure: process.env.NODE_ENV === "production",
	path: "/",
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = !!user;

	// Load user from cookie and verify on mount
	useEffect(() => {
		const initAuth = async () => {
			const storedUser = Cookies.get(USER_COOKIE_KEY);

			if (!storedUser) {
				setIsLoading(false);
				return;
			}

			try {
				const parsedUser = JSON.parse(storedUser) as User;
				
				// Verify session is still valid by fetching current user
				const { data } = await api.get("/auth/me");
				
				// Update user data from server (source of truth)
				setUser(data.user);
				Cookies.set(USER_COOKIE_KEY, JSON.stringify(data.user), COOKIE_OPTIONS);
			} catch (error) {
				// Session is invalid, clear cookies
				Cookies.remove(USER_COOKIE_KEY, { path: "/" });
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		initAuth();
	}, []);

	const login = async (email: string, password: string) => {
		const { data } = await api.post("/auth/login", { email, password });
		
		const { user: userData } = data;
		
		// Store user in cookie (auth_token is HTTP-only cookie set by server)
		Cookies.set(USER_COOKIE_KEY, JSON.stringify(userData), COOKIE_OPTIONS);
		
		setUser(userData);
	};

	const logout = async () => {
		try {
			// Server will clear HTTP-only auth_token cookie
			await api.post("/auth/logout");
		} catch (error) {
			// Continue with logout even if API call fails
			console.error("Logout error:", error);
		} finally {
			// Clear user cookie and state
			Cookies.remove(USER_COOKIE_KEY, { path: "/" });
			setUser(null);
		}
	};

	const refreshUser = async () => {
		const storedUser = Cookies.get(USER_COOKIE_KEY);
		if (!storedUser) return;

		try {
			const { data } = await api.get("/auth/me");
			setUser(data.user);
			Cookies.set(USER_COOKIE_KEY, JSON.stringify(data.user), COOKIE_OPTIONS);
		} catch (error) {
			// Session is invalid, clear everything
			Cookies.remove(USER_COOKIE_KEY, { path: "/" });
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
