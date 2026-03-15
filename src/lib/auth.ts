import { api } from "@/lib/api";

export type AccountRole = "buyer" | "seller";

export interface RegisterPayload {
	fullName: string;
	email: string;
	password: string;
	country: string;
	role: AccountRole;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface ForgotPasswordPayload {
	email: string;
}

export interface ResetPasswordPayload {
	token: string;
	password: string;
}

export type ApiResponse = Record<string, unknown>;

export async function register(payload: RegisterPayload): Promise<ApiResponse> {
	const { data } = await api.post("/auth/register", payload);
	return data as ApiResponse;
}

export async function login(payload: LoginPayload): Promise<ApiResponse> {
	const { data } = await api.post("/auth/login", payload);
	return data as ApiResponse;
}

export async function verifyEmail(token: string): Promise<ApiResponse> {
	const { data } = await api.get("/auth/verify-email", {
		params: { token },
	});
	return data as ApiResponse;
}

export async function forgotPassword(
	payload: ForgotPasswordPayload,
): Promise<ApiResponse> {
	const { data } = await api.post("/auth/forgot-password", payload);
	return data as ApiResponse;
}

export async function resetPassword(
	payload: ResetPasswordPayload,
): Promise<ApiResponse> {
	const { data } = await api.post("/auth/reset-password", payload);
	return data as ApiResponse;
}
