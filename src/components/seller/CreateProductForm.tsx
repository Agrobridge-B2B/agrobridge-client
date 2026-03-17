"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/lib/products";
import { sanitizeFormData } from "@/lib/sanitize";
import { getApiErrorMessage } from "@/lib/api";
import {
	createProductSchema,
	type CreateProductFormData,
	PRODUCT_CATEGORIES,
	PRODUCT_UNITS,
} from "@/lib/validations/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

export function CreateProductForm() {
	const router = useRouter();
	const [apiError, setApiError] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CreateProductFormData>({
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			name: "",
			description: "",
			category: undefined,
			country: "",
			pricePerUnit: undefined,
			unit: "KG",
			minOrderQuantity: undefined,
		},
	});

	async function onSubmit(formData: CreateProductFormData) {
		setApiError(null);

		try {
			const sanitizedData = sanitizeFormData(formData as Record<string, unknown>) as CreateProductFormData;

			await createProduct({
				name: sanitizedData.name,
				description: sanitizedData.description,
				category: sanitizedData.category,
				country: sanitizedData.country,
				pricePerUnit: sanitizedData.pricePerUnit,
				unit: sanitizedData.unit,
				minOrderQuantity: sanitizedData.minOrderQuantity,
				images,
			});

			router.push("/seller/products");
		} catch (error) {
			setApiError(getApiErrorMessage(error));
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
			noValidate
		>
			{apiError && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
					{apiError}
				</div>
			)}

			{/* Product Name */}
			<div>
				<Label htmlFor="name" className="text-sm font-medium text-gray-700">
					Titre du Produit <span className="text-red-500">*</span>
				</Label>
				<Input
					id="name"
					type="text"
					placeholder="Ex. Café Arabica Premium"
					className="mt-1"
					{...register("name")}
					aria-invalid={!!errors.name}
				/>
				{errors.name && (
					<p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
				)}
			</div>

			{/* Description */}
			<div>
				<Label htmlFor="description" className="text-sm font-medium text-gray-700">
					Description
				</Label>
				<textarea
					id="description"
					rows={4}
					placeholder="Décrivez votre produit, son origine, ses caractéristiques..."
					className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
					{...register("description")}
					aria-invalid={!!errors.description}
				/>
				{errors.description && (
					<p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
				)}
			</div>

			{/* Category and Price */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<Label htmlFor="category" className="text-sm font-medium text-gray-700">
						Catégorie <span className="text-red-500">*</span>
					</Label>
					<select
						id="category"
						className="mt-1 w-full h-9 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent bg-white"
						{...register("category")}
						aria-invalid={!!errors.category}
					>
						<option value="">Sélectionner une catégorie</option>
						{PRODUCT_CATEGORIES.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
					)}
				</div>

				<div>
					<Label htmlFor="pricePerUnit" className="text-sm font-medium text-gray-700">
						Prix par unité (€) <span className="text-red-500">*</span>
					</Label>
					<Input
						id="pricePerUnit"
						type="number"
						step="0.01"
						min="0"
						placeholder="0.00"
						className="mt-1"
						{...register("pricePerUnit", { valueAsNumber: true })}
						aria-invalid={!!errors.pricePerUnit}
					/>
					{errors.pricePerUnit && (
						<p className="text-sm text-red-600 mt-1">{errors.pricePerUnit.message}</p>
					)}
				</div>
			</div>

			{/* Unit and Country */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<Label htmlFor="unit" className="text-sm font-medium text-gray-700">
						Unité de mesure <span className="text-red-500">*</span>
					</Label>
					<select
						id="unit"
						className="mt-1 w-full h-9 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent bg-white"
						{...register("unit")}
						aria-invalid={!!errors.unit}
					>
						{PRODUCT_UNITS.map((unit) => (
							<option key={unit.value} value={unit.value}>
								{unit.label}
							</option>
						))}
					</select>
					{errors.unit && (
						<p className="text-sm text-red-600 mt-1">{errors.unit.message}</p>
					)}
				</div>

				<div>
					<Label htmlFor="country" className="text-sm font-medium text-gray-700">
						Pays d&apos;origine <span className="text-red-500">*</span>
					</Label>
					<Input
						id="country"
						type="text"
						placeholder="Ex. Côte d'Ivoire"
						className="mt-1"
						{...register("country")}
						aria-invalid={!!errors.country}
					/>
					{errors.country && (
						<p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
					)}
				</div>
			</div>

			{/* Min Order Quantity */}
			<div>
				<Label htmlFor="minOrderQuantity" className="text-sm font-medium text-gray-700">
					Quantité minimale de commande
				</Label>
				<Input
					id="minOrderQuantity"
					type="number"
					min="1"
					placeholder="Ex. 100"
					className="mt-1"
					{...register("minOrderQuantity", { valueAsNumber: true })}
					aria-invalid={!!errors.minOrderQuantity}
				/>
				{errors.minOrderQuantity && (
					<p className="text-sm text-red-600 mt-1">{errors.minOrderQuantity.message}</p>
				)}
				<p className="text-xs text-gray-500 mt-1">
					Laissez vide si aucune quantité minimale n&apos;est requise
				</p>
			</div>

			{/* Images Upload */}
			<ImageUpload images={images} onImagesChange={setImages} />

			{/* Submit Button */}
			<div className="flex items-center gap-4 pt-4 border-t border-gray-100">
				<Button
					type="submit"
					disabled={isSubmitting}
					className="bg-brand-green hover:bg-brand-green/90 text-white flex-1 h-11"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							Publication en cours...
						</>
					) : (
						"Publier le Produit"
					)}
				</Button>
				<Button
					type="button"
					variant="outline"
					className="flex-1 h-11"
					disabled={isSubmitting}
					onClick={() => router.push("/seller/products")}
				>
					Annuler
				</Button>
			</div>
		</form>
	);
}
