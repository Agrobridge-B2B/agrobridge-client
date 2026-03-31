"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Check, Star, CreditCard, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToastContext } from "@/context/ToastContext";
import { getImageUrl } from "@/lib/upload";
import type { Product } from "@/lib/products";

interface ProductDetailClientProps {
	product: Product;
}

function getSellerInfo(seller: Product["seller"]) {
	if (typeof seller === "object" && seller !== null) {
		return {
			name: seller.fullName,
			isCertified: seller.isCertified === true,
		};
	}
	return { name: String(seller), isCertified: false };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
	const router = useRouter();
	const { addItem, setItemQuantity, isInCart } = useCart();
	const { addToast } = useToastContext();
	const seller = getSellerInfo(product.seller);
	const unitLabel = product.unit.toLowerCase();
	const minQuantity = product.minOrderQuantity || 1;

	const [quantity, setQuantity] = useState(minQuantity);
	const [selectedImage, setSelectedImage] = useState(0);

	const total = quantity * product.pricePerUnit;

	function decrementQty() {
		setQuantity((prev) => Math.max(minQuantity, prev - 1));
	}

	function incrementQty() {
		setQuantity((prev) => prev + 1);
	}

	function handleAddToCart() {
		addItem(product, quantity);
		addToast(`${product.name} (${quantity} ${unitLabel}) ajouté au panier avec succès!`);
	}

	function handleBuyNow() {
		setItemQuantity(product, quantity);
		router.push("/buyer/checkout");
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Back Link */}
			<Link
				href="/buyer/products"
				className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
			>
				<ArrowLeft className="w-4 h-4" />
				Retour aux produits
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
				{/* Left Column — Images */}
				<div>
					{/* Main Image */}
					<div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
						{product.images?.[selectedImage] ? (
							<Image
								src={getImageUrl(product.images[selectedImage])}
								alt={product.name}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
								unoptimized
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-300">
								<svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
						)}
						{seller.isCertified && (
							<span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-brand-green text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
								<Check className="w-3.5 h-3.5" />
								Vérifié
							</span>
						)}
					</div>

					{/* Thumbnail Gallery */}
					{product.images && product.images.length > 1 && (
						<div className="flex gap-2 overflow-x-auto pb-1">
							{product.images.map((img, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedImage(idx)}
									className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
										idx === selectedImage
											? "border-brand-green"
											: "border-transparent hover:border-gray-300"
									}`}
								>
									<Image
										src={getImageUrl(img)}
										alt={`${product.name} ${idx + 1}`}
										fill
										className="object-cover"
										sizes="64px"
										unoptimized
									/>
								</button>
							))}
						</div>
					)}

					{/* Seller Card */}
					<div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
						<p className="text-xs text-gray-500 mb-1">Vendeur</p>
						<p className="text-sm font-semibold text-gray-900">{seller.name}</p>
					</div>
				</div>

				{/* Right Column — Product Info */}
				<div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

					<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
						<MapPin className="w-4 h-4" />
						{product.country}
					</div>

					{/* Rating placeholder */}
					<div className="flex items-center gap-1.5 mb-6">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
							/>
						))}
						<span className="text-sm text-gray-500 ml-1">0 avis</span>
					</div>

					{/* Description */}
					{product.description && (
						<div className="mb-6">
							<h2 className="font-semibold text-gray-900 mb-2">Description</h2>
							<p className="text-sm text-gray-600 leading-relaxed">
								{product.description}
							</p>
						</div>
					)}

					{/* Price Box */}
					<div className="bg-emerald-50 rounded-xl p-4 mb-6">
						<p className="text-xl font-bold text-gray-900">
							{product.pricePerUnit.toLocaleString("fr-FR", {
								style: "currency",
								currency: "EUR",
							})}
							<span className="text-sm font-normal text-gray-600"> /{unitLabel}</span>
						</p>
						<p className="text-sm text-gray-500 mt-1">
							Commande minimale: {minQuantity} {unitLabel}
						</p>
					</div>

					{/* Quantity */}
					<div className="mb-4">
						<h3 className="font-semibold text-gray-900 mb-2">Quantité</h3>
						<div className="flex items-center gap-3">
							<div className="flex items-center border border-gray-300 rounded-lg">
								<button
									onClick={decrementQty}
									className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
								>
									<Minus className="w-4 h-4" />
								</button>
								<input
									type="number"
									value={quantity}
									onChange={(e) => {
										const val = parseInt(e.target.value, 10);
										if (!isNaN(val) && val >= minQuantity) {
											setQuantity(val);
										}
									}}
									className="w-16 text-center border-x border-gray-300 py-2 text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
									min={minQuantity}
								/>
								<button
									onClick={incrementQty}
									className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
							<span className="text-sm text-gray-500">{unitLabel}</span>
						</div>
					</div>

					{/* Total */}
					<div className="bg-gray-50 rounded-xl p-4 mb-6">
						<p className="text-sm text-gray-500">
							Total:{" "}
							<span className="text-lg font-bold text-brand-green">
								{total.toLocaleString("fr-FR", {
									style: "currency",
									currency: "EUR",
								})}
							</span>
						</p>
					</div>

					{/* Payment Method */}
					<div className="mb-6">
						<h3 className="font-semibold text-gray-900 mb-3">Mode de paiement</h3>
						<label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors">
							<input
								type="radio"
								name="payment"
								defaultChecked
								className="w-4 h-4 text-brand-green accent-brand-green"
							/>
							<CreditCard className="w-5 h-5 text-gray-500" />
							<span className="text-sm font-medium text-gray-700">
								Paiement securise en ligne
							</span>
						</label>
					</div>

					<div className="flex flex-col sm:flex-row gap-3">
						<button
							type="button"
							onClick={handleAddToCart}
							className="w-full border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
						>
							{isInCart(product._id) ? "Ajouter de nouveau" : "Ajouter au panier"}
						</button>
						<button
							type="button"
							onClick={handleBuyNow}
							className="w-full bg-brand-green text-white font-semibold py-3.5 rounded-xl hover:bg-brand-green/90 transition-colors text-sm"
						>
							Passer au paiement
						</button>
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<div className="mt-12 border-t border-gray-200 pt-8">
				<h2 className="text-lg font-semibold text-gray-900 mb-6">
					Avis clients (0)
				</h2>
				<div className="text-center py-8">
					<p className="text-sm text-gray-400">
						Aucun avis pour le moment. Soyez le premier à donner votre avis !
					</p>
				</div>
			</div>
		</div>
	);
}
