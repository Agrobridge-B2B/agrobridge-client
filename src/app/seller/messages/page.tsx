import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { MessagesPageClient } from "@/components/messages/MessagesPageClient";

export const metadata: Metadata = {
	title: "Messages | Agrobridge",
	description: "Gérez vos conversations avec vos acheteurs sur Agrobridge.",
};

function MessagesLoading() {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-8rem)]">
			<div className="text-center">
				<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
				<p className="text-sm text-gray-500">
					Chargement des messages...
				</p>
			</div>
		</div>
	);
}

export default function SellerMessagesPage() {
	return (
		<div className="-m-6">
			<Suspense fallback={<MessagesLoading />}>
				<MessagesPageClient />
			</Suspense>
		</div>
	);
}
