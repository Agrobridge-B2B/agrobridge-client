"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/products";
import { getApiErrorMessage } from "@/lib/api";
import { getImageUrl } from "@/lib/upload";

interface ProductCardProps {
	id: string;
	name: string;
	category: string;
	pricePerUnit: number;
	unit: string;
	image?: string;
	status: "active" | "pending" | "inactive";
	onDeleted?: () => void;
}

const STATUS_CONFIG = {
	active: { color: "bg-emerald-100 text-emerald-700", label: "Approuvé" },
	pending: { color: "bg-amber-100 text-amber-700", label: "En attente" },
	inactive: { color: "bg-gray-100 text-gray-600", label: "Inactif" },
} as const;

export function ProductCard({
	id,
	name,
	category,
	pricePerUnit,
	unit,
	image,
	status,
	onDeleted,
}: ProductCardProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	async function handleDelete() {
		try {
			setIsDeleting(true);
			await deleteProduct(id);
			onDeleted?.();
		} catch (error) {
			alert(getApiErrorMessage(error));
		} finally {
			setIsDeleting(false);
			setShowConfirm(false);
		}
	}

	const statusStyle = STATUS_CONFIG[status];

	return (
		<div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
			{/* Product Image */}
			<div className="relative h-48 bg-gray-50">
				{image ? (
					<Image
						src={getImageUrl(image)}
						alt={name}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						unoptimized
					/>
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
						<Package className="w-10 h-10 mb-2" />
						<span className="text-xs">Aucune image</span>
					</div>
				)}
				<span
					className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${statusStyle.color}`}
				>
					{statusStyle.label}
				</span>
			</div>

			{/* Product Info */}
			<div className="p-4 space-y-3">
				<div>
					<h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-brand-green transition-colors">
						{name}
					</h3>
					<p className="text-sm text-gray-500 mt-0.5">{category}</p>
				</div>

				<p className="text-lg font-bold text-brand-green">
					{pricePerUnit.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
					<span className="text-sm font-normal text-gray-500">/{unit.toLowerCase()}</span>
				</p>

				{/* Delete Confirmation */}
				{showConfirm ? (
					<div className="flex items-center gap-2 pt-1">
						<Button
							variant="destructive"
							size="sm"
							className="flex-1"
							onClick={handleDelete}
							disabled={isDeleting}
						>
							{isDeleting ? "Suppression..." : "Confirmer"}
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex-1"
							onClick={() => setShowConfirm(false)}
							disabled={isDeleting}
						>
							Annuler
						</Button>
					</div>
				) : (
					<div className="flex items-center gap-2 pt-1">
						<Link href={`/seller/products/${id}/edit`} className="flex-1">
							<Button
								variant="outline"
								size="sm"
								className="w-full flex items-center justify-center gap-2"
							>
								<Pencil className="w-3.5 h-3.5" />
								Modifier
							</Button>
						</Link>
						<Button
							variant="ghost"
							size="sm"
							className="px-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50"
							onClick={() => setShowConfirm(true)}
							aria-label="Supprimer le produit"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
