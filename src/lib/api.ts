import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";

export const api = axios.create({
	baseURL: apiBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

export function getApiErrorMessage(
	error: unknown,
	fallbackMessage = "Une erreur est survenue. Veuillez réessayer.",
): string {
	if (!axios.isAxiosError(error)) {
		return fallbackMessage;
	}

	const responseData = error.response?.data;

	if (typeof responseData === "string" && responseData.trim().length > 0) {
		return responseData;
	}

	if (responseData && typeof responseData === "object") {
		const message = (responseData as { message?: unknown }).message;
		if (typeof message === "string" && message.trim().length > 0) {
			return message;
		}

		const errorText = (responseData as { error?: unknown }).error;
		if (typeof errorText === "string" && errorText.trim().length > 0) {
			return errorText;
		}
	}

	if (error.response) {
		const status = error.response.status;
		const statusText = error.response.statusText?.trim();
		if (statusText) {
			return `Erreur serveur (${status} ${statusText}).`;
		}
		return `Erreur serveur (${status}).`;
	}

	if (error.request) {
		return "Impossible de joindre le serveur API. Vérifiez l'URL backend et CORS.";
	}

	return fallbackMessage;
}
