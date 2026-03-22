"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ProductsPaginationProps {
	total: number;
	page: number;
	pages: number;
}

export function ProductsPagination({ total, page, pages }: ProductsPaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	if (pages <= 1) return null;

	function handlePageChange(newPage: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(newPage));
		startTransition(() => {
			router.push(`/buyer/products?${params.toString()}`);
		});
	}

	return (
		<div className="flex items-center justify-center gap-2 py-8">
			<button
				onClick={() => handlePageChange(page - 1)}
				disabled={page <= 1 || isPending}
				className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>

			{Array.from({ length: Math.min(pages, 5) }, (_, i) => {
				let pageNum: number;
				if (pages <= 5) {
					pageNum = i + 1;
				} else if (page <= 3) {
					pageNum = i + 1;
				} else if (page >= pages - 2) {
					pageNum = pages - 4 + i;
				} else {
					pageNum = page - 2 + i;
				}
				return (
					<button
						key={pageNum}
						onClick={() => handlePageChange(pageNum)}
						disabled={isPending}
						className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
							pageNum === page
								? "bg-brand-green text-white"
								: "border border-gray-200 text-gray-600 hover:bg-gray-50"
						}`}
					>
						{pageNum}
					</button>
				);
			})}

			<button
				onClick={() => handlePageChange(page + 1)}
				disabled={page >= pages || isPending}
				className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
			>
				<ChevronRight className="w-4 h-4" />
			</button>

			{isPending && <Loader2 className="w-4 h-4 animate-spin text-brand-green ml-2" />}
		</div>
	);
}
