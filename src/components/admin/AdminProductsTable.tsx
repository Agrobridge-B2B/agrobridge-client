"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
	Search,
	Check,
	X,
	Trash2,
	Package,
	ChevronLeft,
	ChevronRight,
	Loader2,
	Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { getImageUrl } from "@/lib/upload";
import { approveProduct, rejectProduct, adminDeleteProduct } from "@/lib/admin/products";
import { PRODUCT_CATEGORIES } from "@/lib/validations/product";
import type { Product } from "@/lib/products";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface AdminProductsTableProps {
	initialProducts: Product[];
	initialPagination: Pagination;
	currentSearch: string;
	currentCategory: string;
	currentStatus: string;
}

type StatusFilter = "all" | "pending" | "approved";

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
	{ value: "all", label: "Tous" },
	{ value: "pending", label: "En attente" },
	{ value: "approved", label: "Approuvés" },
];

function getSellerName(seller: Product["seller"]): string {
	if (typeof seller === "object" && seller !== null) {
		return seller.fullName;
	}
	return String(seller);
}

function getSellerEmail(seller: Product["seller"]): string {
	if (typeof seller === "object" && seller !== null) {
		return seller.email;
	}
	return "";
}

export function AdminProductsTable({
	initialProducts,
	initialPagination,
	currentSearch,
	currentCategory,
	currentStatus,
}: AdminProductsTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const products = initialProducts;
	const pagination = initialPagination;

	function updateSearchParams(updates: Record<string, string | undefined>) {
		const params = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value === undefined || value === "" || value === "all") {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		}
		// Reset to page 1 when filters change (except when changing page itself)
		if (!("page" in updates)) {
			params.delete("page");
		}
		startTransition(() => {
			router.push(`/agro-admin/agro-products?${params.toString()}`);
		});
	}

	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const search = formData.get("search") as string;
		updateSearchParams({ search: search.trim() || undefined });
	}

	function handleStatusFilter(status: StatusFilter) {
		const isApproved =
			status === "approved" ? "true" : status === "pending" ? "false" : undefined;
		updateSearchParams({ isApproved });
	}

	function handleCategoryFilter(category: string) {
		updateSearchParams({ category: category || undefined });
	}

	function handlePageChange(page: number) {
		updateSearchParams({ page: String(page) });
	}

	async function handleApprove(productId: string) {
		setActionLoadingId(productId);
		setActionError(null);
		try {
			await approveProduct(productId);
			router.refresh();
		} catch (error) {
			setActionError(getApiErrorMessage(error));
		} finally {
			setActionLoadingId(null);
		}
	}

	async function handleReject(productId: string) {
		setActionLoadingId(productId);
		setActionError(null);
		try {
			await rejectProduct(productId);
			router.refresh();
		} catch (error) {
			setActionError(getApiErrorMessage(error));
		} finally {
			setActionLoadingId(null);
		}
	}

	async function handleDelete(productId: string) {
		setActionLoadingId(productId);
		setActionError(null);
		try {
			await adminDeleteProduct(productId);
			setDeleteConfirmId(null);
			router.refresh();
		} catch (error) {
			setActionError(getApiErrorMessage(error));
		} finally {
			setActionLoadingId(null);
		}
	}

	return (
		<div className="space-y-4">
			{/* Action Error Banner */}
			{actionError && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex items-center justify-between">
					<span>{actionError}</span>
					<button onClick={() => setActionError(null)} className="text-red-500 hover:text-red-700">
						<X className="w-4 h-4" />
					</button>
				</div>
			)}

			{/* Status Tabs */}
			<div className="flex items-center gap-2">
				{STATUS_TABS.map((tab) => {
					const isActive =
						(tab.value === "all" && !currentStatus) ||
						(tab.value === "pending" && currentStatus === "false") ||
						(tab.value === "approved" && currentStatus === "true");
					return (
						<button
							key={tab.value}
							onClick={() => handleStatusFilter(tab.value)}
							disabled={isPending}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
								isActive
									? "bg-brand-green text-white"
									: "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
							}`}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Filters Bar */}
			<div className="bg-white rounded-xl border border-gray-100">
				<div className="flex items-center justify-between gap-4 p-4 border-b border-gray-100">
					{/* Search */}
					<form onSubmit={handleSearch} className="relative w-80">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							name="search"
							type="text"
							defaultValue={currentSearch}
							placeholder="Rechercher un produit..."
							className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
						/>
					</form>

					{/* Category Filter */}
					<div className="flex items-center gap-2">
						<select
							value={currentCategory}
							onChange={(e) => handleCategoryFilter(e.target.value)}
							disabled={isPending}
							className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
						>
							<option value="">Toutes les catégories</option>
							{PRODUCT_CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>

						{isPending && <Loader2 className="w-4 h-4 animate-spin text-brand-green" />}
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Produit
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Catégorie
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Vendeur
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Prix
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Statut
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Date
								</th>
								<th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{products.length === 0 && (
								<tr>
									<td colSpan={7} className="px-4 py-16 text-center">
										<Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
										<p className="text-sm text-gray-500">Aucun produit trouvé</p>
									</td>
								</tr>
							)}
							{products.map((product) => (
								<tr
									key={product._id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									{/* Product */}
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
												{product.images?.[0] ? (
													<Image
														src={getImageUrl(product.images[0])}
														alt={product.name}
														fill
														className="object-cover"
														sizes="40px"
														unoptimized
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<Package className="w-5 h-5 text-gray-300" />
													</div>
												)}
											</div>
											<div className="min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
													{product.name}
												</p>
												<p className="text-xs text-gray-400">{product.country}</p>
											</div>
										</div>
									</td>

									{/* Category */}
									<td className="px-4 py-3">
										<span className="text-sm text-gray-600">{product.category}</span>
									</td>

									{/* Seller */}
									<td className="px-4 py-3">
										<div>
											<p className="text-sm text-gray-900">{getSellerName(product.seller)}</p>
											<p className="text-xs text-gray-400">{getSellerEmail(product.seller)}</p>
										</div>
									</td>

									{/* Price */}
									<td className="px-4 py-3">
										<span className="text-sm font-semibold text-gray-900">
											{product.pricePerUnit.toLocaleString("fr-FR", {
												style: "currency",
												currency: "EUR",
											})}
										</span>
										<span className="text-xs text-gray-400">/{product.unit.toLowerCase()}</span>
									</td>

									{/* Status */}
									<td className="px-4 py-3">
										<span
											className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
												product.isApproved
													? "bg-emerald-100 text-emerald-700"
													: "bg-amber-100 text-amber-700"
											}`}
										>
											{product.isApproved ? "Approuvé" : "En attente"}
										</span>
									</td>

									{/* Date */}
									<td className="px-4 py-3">
										<span className="text-sm text-gray-500">
											{new Date(product.createdAt).toLocaleDateString("fr-FR", {
												day: "numeric",
												month: "short",
												year: "numeric",
											})}
										</span>
									</td>

									{/* Actions */}
									<td className="px-4 py-3">
										<div className="flex items-center justify-end gap-1">
											{actionLoadingId === product._id ? (
												<Loader2 className="w-4 h-4 animate-spin text-gray-400" />
											) : deleteConfirmId === product._id ? (
												<>
													<Button
														variant="destructive"
														size="sm"
														className="h-7 text-xs"
														onClick={() => handleDelete(product._id)}
													>
														Confirmer
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="h-7 text-xs"
														onClick={() => setDeleteConfirmId(null)}
													>
														Annuler
													</Button>
												</>
											) : (
												<>
													{!product.isApproved && (
														<button
															onClick={() => handleApprove(product._id)}
															className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
															title="Approuver"
														>
															<Check className="w-4 h-4" />
														</button>
													)}
													{product.isApproved && (
														<button
															onClick={() => handleReject(product._id)}
															className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
															title="Rejeter"
														>
															<X className="w-4 h-4" />
														</button>
													)}
													<button
														onClick={() => setDeleteConfirmId(product._id)}
														className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
														title="Supprimer"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{pagination.pages > 1 && (
					<div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
						<p className="text-sm text-gray-500">
							{pagination.total} produit{pagination.total > 1 ? "s" : ""} · Page{" "}
							{pagination.page} sur {pagination.pages}
						</p>
						<div className="flex items-center gap-1">
							<Button
								variant="outline"
								size="sm"
								className="h-8"
								disabled={pagination.page <= 1 || isPending}
								onClick={() => handlePageChange(pagination.page - 1)}
							>
								<ChevronLeft className="w-4 h-4" />
							</Button>
							{Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
								let pageNum: number;
								if (pagination.pages <= 5) {
									pageNum = i + 1;
								} else if (pagination.page <= 3) {
									pageNum = i + 1;
								} else if (pagination.page >= pagination.pages - 2) {
									pageNum = pagination.pages - 4 + i;
								} else {
									pageNum = pagination.page - 2 + i;
								}
								return (
									<Button
										key={pageNum}
										variant={pageNum === pagination.page ? "default" : "outline"}
										size="sm"
										className={`h-8 w-8 ${
											pageNum === pagination.page
												? "bg-brand-green hover:bg-brand-green/90 text-white"
												: ""
										}`}
										disabled={isPending}
										onClick={() => handlePageChange(pageNum)}
									>
										{pageNum}
									</Button>
								);
							})}
							<Button
								variant="outline"
								size="sm"
								className="h-8"
								disabled={pagination.page >= pagination.pages || isPending}
								onClick={() => handlePageChange(pagination.page + 1)}
							>
								<ChevronRight className="w-4 h-4" />
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
