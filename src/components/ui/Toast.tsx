"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
	message: string;
	visible: boolean;
	onClose: () => void;
	duration?: number;
}

export function Toast({ message, visible, onClose, duration = 3000 }: ToastProps) {
	const [isVisible, setIsVisible] = useState(visible);

	useEffect(() => {
		setIsVisible(visible);
	}, [visible]);

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				onClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	return (
		<div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
			<div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] max-w-[400px]">
				<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
					<Check className="w-4 h-4 text-green-600" />
				</div>
				<p className="text-sm font-medium text-gray-900 flex-1">{message}</p>
				<button
					onClick={() => {
						setIsVisible(false);
						onClose();
					}}
					className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
				>
					<X className="w-4 h-4 text-gray-400" />
				</button>
			</div>
		</div>
	);
}
