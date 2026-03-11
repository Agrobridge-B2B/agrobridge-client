"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authService, type AuthUser } from "@/lib/auth";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string; code?: string; user?: AuthUser }>;
    register: (data: {
        fullName: string;
        email: string;
        password: string;
        country: string;
        role: "buyer" | "seller";
    }) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const token = authService.getToken();
            if (!token) {
                setUser(null);
                return;
            }
            const res = await authService.getMe();
            setUser(res.user ?? null);
        } catch {
            setUser(null);
            authService.logout();
        }
    }, []);

    useEffect(() => {
        const storedUser = authService.getUser();
        if (storedUser) {
            setUser(storedUser);
            refreshUser().finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [refreshUser]);

    const login = async (email: string, password: string) => {
        try {
            const res = await authService.login(email, password);
            if (res.user) {
                setUser(res.user);
            }
            return { success: true, message: res.message, user: res.user };
        } catch (error: any) {
            const msg = error.response?.data?.message || "Login failed";
            const code = error.response?.data?.code;
            return { success: false, message: msg, code };
        }
    };

    const register = async (data: {
        fullName: string;
        email: string;
        password: string;
        country: string;
        role: "buyer" | "seller";
    }) => {
        try {
            const res = await authService.register(data);
            return { success: true, message: res.message };
        } catch (error: any) {
            const msg = error.response?.data?.message || "Registration failed";
            return { success: false, message: msg };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
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
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
