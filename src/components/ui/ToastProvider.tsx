"use client";

import { useToast } from "@/hooks/useToast";
import { Toast } from "./Toast";

export function ToastProvider() {
	const { toasts, removeToast } = useToast();

	return (
		<>
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					message={toast.message}
					visible={true}
					onClose={() => removeToast(toast.id)}
				/>
			))}
		</>
	);
}
