"use client";

import { useState, useCallback } from "react";

interface Toast {
	id: string;
	message: string;
}

export function useToast() {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((message: string) => {
		const id = Date.now().toString();
		const newToast = { id, message };
		
		setToasts((prev) => [...prev, newToast]);
		
		// Auto-remove after 3 seconds
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 3000);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return { toasts, addToast, removeToast };
}
