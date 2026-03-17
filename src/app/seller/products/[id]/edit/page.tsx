"use client";

import { use } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { EditProductForm } from "@/components/seller/EditProductForm";

interface EditProductPageProps {
	params: Promise<{ id: string }>;
}

function EditProductPageContent({ params }: EditProductPageProps) {
	const { id } = use(params);

	return <EditProductForm productId={id} />;
}

export default function EditProductPage({ params }: EditProductPageProps) {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<EditProductPageContent params={params} />
		</ProtectedRoute>
	);
}
