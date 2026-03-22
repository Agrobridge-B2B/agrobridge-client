import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "http://localhost:8000/api";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export interface AdminUser {
	_id: string;
	fullName: string;
	email: string;
	country: string;
	role: string;
	profileImage?: string;
	isVerified: boolean;
	isBlocked: boolean;
	isCertified: boolean;
	certificationStatus: "none" | "pending" | "approved" | "rejected";
	createdAt: string;
}

export interface CertificationRequest {
	_id: string;
	fullName: string;
	email: string;
	country: string;
	profileImage?: string;
	isCertified: boolean;
	certificationStatus: "none" | "pending" | "approved" | "rejected";
	certificationDocument?: string;
	certificationRequestDate?: string;
	certificationReviewDate?: string;
	createdAt: string;
}

async function serverFetch(url: string) {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token")?.value;

	const res = await fetch(url, {
		cache: "no-store",
		headers: {
			...(token ? { Cookie: `auth_token=${token}` } : {}),
		},
	});

	if (!res.ok) {
		throw new Error(`Erreur API (${res.status})`);
	}

	return res.json();
}

interface FetchUsersParams {
	page?: number;
	limit?: number;
	role?: string;
	search?: string;
}

export async function fetchAdminUsers(params: FetchUsersParams = {}): Promise<{
	users: AdminUser[];
	pagination: Pagination;
}> {
	const sp = new URLSearchParams();
	sp.set("page", String(params.page ?? 1));
	sp.set("limit", String(params.limit ?? 10));
	if (params.role) sp.set("role", params.role);
	if (params.search) sp.set("search", params.search);

	const json = await serverFetch(`${API_BASE_URL}/users?${sp.toString()}`);
	return json.data;
}

interface FetchCertRequestsParams {
	page?: number;
	limit?: number;
	status?: string;
	search?: string;
}

export async function fetchCertificationRequests(params: FetchCertRequestsParams = {}): Promise<{
	requests: CertificationRequest[];
	pagination: Pagination;
}> {
	const sp = new URLSearchParams();
	sp.set("page", String(params.page ?? 1));
	sp.set("limit", String(params.limit ?? 10));
	if (params.status) sp.set("status", params.status);
	if (params.search) sp.set("search", params.search);

	const json = await serverFetch(`${API_BASE_URL}/users/certifications?${sp.toString()}`);
	return json.data;
}
