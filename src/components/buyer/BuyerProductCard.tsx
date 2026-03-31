"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToastContext } from "@/context/ToastContext";
import { getImageUrl } from "@/lib/upload";
import type { Product } from "@/lib/products";

interface BuyerProductCardProps {
	product: Product;
}

function isSellerCertified(seller: Product["seller"]): boolean {
	return typeof seller === "object" && seller !== null && seller.isCertified === true;
}

export function BuyerProductCard({ product }: BuyerProductCardProps) {
	const certified = isSellerCertified(product.seller);
	const unitLabel = product.unit.toLowerCase();
	const { addItem } = useCart();
	const { addToast } = useToastContext();

	const handleAddToCart = () => {
		addItem(product, product.minOrderQuantity || 1);
		addToast(`${product.name} ajouté au panier avec succès!`);
	};

	return (
		<div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
			{/* Image */}
			<div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
				{product.images?.[0] ? (
					<Image
						src={getImageUrl(product.images[0])}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						unoptimized
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-300">
						<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>
				)}

				{/* Certified Badge */}
				{certified && (
					<span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-brand-green text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
						<Check className="w-3 h-3" />
						Vérifié
					</span>
				)}
			</div>

			{/* Content */}
			<div className="p-4">
				<h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">
					{product.name}
				</h3>

				{product.description && (
					<p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
						{product.description}
					</p>
				)}

				<div className="flex items-center justify-between mb-3">
					<p className="text-sm font-bold text-gray-900">
						{product.pricePerUnit.toLocaleString("fr-FR", {
							style: "currency",
							currency: "EUR",
						})}
						<span className="text-xs font-normal text-gray-500"> /{unitLabel}</span>
					</p>
					<p className="flex items-center gap-1 text-xs text-gray-400">
						<MapPin className="w-3 h-3" />
						{product.country}
					</p>
				</div>

				<div className="flex gap-2">
					<button
						type="button"
						onClick={handleAddToCart}
						className="inline-flex items-center justify-center gap-2 flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
					>
						<ShoppingCart className="w-4 h-4" />
						Ajouter
					</button>
					<Link
						href={`/buyer/products/${product._id}`}
						className="block flex-1 text-center bg-brand-green text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-green/90 transition-colors"
					>
						Voir détails
					</Link>
				</div>
			</div>
		</div>
	);
}
