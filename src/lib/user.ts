import { api } from "@/lib/api";

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

// ── Profile ──────────────────────────────────────────────

export async function updateProfile(data: { country: string }) {
	const res = await api.patch<ApiResponse<{ user: any }>>("/users/profile", data);
	return res.data.data.user;
}

export async function uploadProfileImage(file: File) {
	const formData = new FormData();
	formData.append("profileImage", file);
	const res = await api.patch<ApiResponse<{ user: any }>>(
		"/users/profile/image",
		formData,
		{ headers: { "Content-Type": "multipart/form-data" } }
	);
	return res.data.data.user;
}

export async function changePassword(currentPassword: string, newPassword: string) {
	const res = await api.patch<ApiResponse<null>>("/users/profile/password", {
		currentPassword,
		newPassword,
	});
	return res.data;
}

// ── Certification ────────────────────────────────────────

export interface CertificationInfo {
	isCertified: boolean;
	certificationStatus: "none" | "pending" | "approved" | "rejected";
	certificationDocument?: string;
	certificationRequestDate?: string;
	certificationReviewDate?: string;
}

export async function getCertificationStatus(): Promise<CertificationInfo> {
	const res = await api.get<ApiResponse<{ certification: CertificationInfo }>>(
		"/users/certification"
	);
	return res.data.data.certification;
}

export async function submitCertification(file: File) {
	const formData = new FormData();
	formData.append("document", file);
	const res = await api.post<ApiResponse<{ user: any }>>(
		"/users/certification",
		formData,
		{ headers: { "Content-Type": "multipart/form-data" } }
	);
	return res.data.data.user;
}
