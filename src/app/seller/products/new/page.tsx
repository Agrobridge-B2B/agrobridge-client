"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { CreateProductForm } from "@/components/seller/CreateProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function NewProductPageContent() {
	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div className="flex items-center gap-4">
				<Link href="/seller/products">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="w-4 h-4" />
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Ajouter un Nouveau Produit
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Remplissez les informations ci-dessous pour publier votre produit
					</p>
				</div>
			</div>

			<CreateProductForm />
		</div>
	);
}

export default function NewProductPage() {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<NewProductPageContent />
		</ProtectedRoute>
	);
}
