"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useToast } from "@/hooks/useToast";

interface ToastContextType {
	addToast: (message: string) => void;
	toasts: { id: string; message: string }[];
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const toastState = useToast();

	return (
		<ToastContext.Provider value={toastState}>
			{children}
			{toastState.toasts.map((toast) => (
				<div key={toast.id} className="fixed top-4 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
					<div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] max-w-[400px]">
						<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<p className="text-sm font-medium text-gray-900 flex-1">{toast.message}</p>
						<button
							onClick={() => toastState.removeToast(toast.id)}
							className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
						>
							<svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			))}
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToastContext must be used within a ToastProvider");
	}
	return context;
}
