import { api } from "@/lib/api";

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export async function approveCertification(userId: string) {
	const res = await api.patch<ApiResponse<{ user: any }>>(
		`/users/certifications/${userId}/approve`
	);
	return res.data;
}

export async function rejectCertification(userId: string) {
	const res = await api.patch<ApiResponse<{ user: any }>>(
		`/users/certifications/${userId}/reject`
	);
	return res.data;
}

export async function deleteUser(userId: string) {
	const res = await api.delete<ApiResponse<null>>(`/users/${userId}`);
	return res.data;
}
