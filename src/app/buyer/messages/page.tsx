"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MessagesPageClient } from "@/components/messages/MessagesPageClient";

function MessagesLoading() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
				<p className="text-sm text-gray-500">
					Chargement des messages...
				</p>
			</div>
		</div>
	);
}

function BuyerMessagesContent() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center h-16 gap-4">
						<Link
							href="/buyer/products"
							className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
							aria-label="Retour"
						>
							<ArrowLeft className="w-5 h-5" />
						</Link>

						<Link href="/buyer/products" className="shrink-0">
							<img
								src="/logo/agrobridge-01.svg"
								alt="Agrobridge"
								className="h-8"
							/>
						</Link>

						<div className="h-6 w-px bg-gray-200" />

						<h1 className="text-base font-bold text-gray-900">
							Mes Messages
						</h1>
					</div>
				</div>
			</header>

			{/* Main Content — edge-to-edge on mobile, contained on desktop */}
			<main className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-4">
				<Suspense fallback={<MessagesLoading />}>
					<MessagesPageClient />
				</Suspense>
			</main>
		</div>
	);
}

export default function BuyerMessagesPage() {
	return (
		<ProtectedRoute allowedRoles={["buyer"]}>
			<BuyerMessagesContent />
		</ProtectedRoute>
	);
}
