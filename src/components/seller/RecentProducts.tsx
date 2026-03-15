"use client";

import { Package } from "lucide-react";

interface Product {
	id: string;
	name: string;
	category: string;
	price: string;
	views: number;
	image?: string;
}

const mockProducts: Product[] = [
	{
		id: "1",
		name: "Café Arabica Premium",
		category: "Café",
		price: "€12.50/kg",
		views: 234,
	},
	{
		id: "2",
		name: "Cacao Bio",
		category: "Cacao",
		price: "€8.75/kg",
		views: 189,
	},
	{
		id: "3",
		name: "Tomates Fraîches",
		category: "Légumes",
		price: "€2.30/kg",
		views: 156,
	},
];

export function RecentProducts() {
	return (
		<div className="bg-white rounded-xl border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">
						Produits Récents
					</h2>
					<p className="text-sm text-gray-500">
						Vos dernières annonces publiées
					</p>
				</div>
			</div>

			<div className="space-y-4">
				{mockProducts.map((product) => (
					<div
						key={product.id}
						className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
					>
						{/* Product Image Placeholder */}
						<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
							<Package className="w-8 h-8 text-gray-400" />
						</div>

						{/* Product Info */}
						<div className="flex-1">
							<h3 className="font-medium text-gray-900">{product.name}</h3>
							<p className="text-sm text-gray-500">{product.category}</p>
						</div>

						{/* Price & Views */}
						<div className="text-right">
							<p className="font-semibold text-brand-green">{product.price}</p>
							<p className="text-xs text-gray-500 flex items-center gap-1">
								<span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
								{product.views} vues
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
