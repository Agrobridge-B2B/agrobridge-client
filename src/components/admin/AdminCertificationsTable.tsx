"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
	Search,
	ShieldCheck,
	ShieldX,
	Clock,
	ExternalLink,
	Loader2,
	ChevronLeft,
	ChevronRight,
	Check,
	X,
} from "lucide-react";
import { getImageUrl } from "@/lib/upload";
import { approveCertification, rejectCertification } from "@/lib/admin/users";
import { getApiErrorMessage } from "@/lib/api";
import type { CertificationRequest } from "@/lib/server/users";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface Props {
	initialRequests: CertificationRequest[];
	initialPagination: Pagination;
	currentSearch: string;
	currentStatus: string;
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "approved":
			return (
				<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
					<ShieldCheck className="w-3 h-3" /> Approuvé
				</span>
			);
		case "pending":
			return (
				<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
					<Clock className="w-3 h-3" /> En attente
				</span>
			);
		case "rejected":
			return (
				<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
					<ShieldX className="w-3 h-3" /> Rejeté
				</span>
			);
		default:
			return null;
	}
}

function formatDate(dateStr?: string) {
	if (!dateStr) return "—";
	return new Date(dateStr).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function AdminCertificationsTable({
	initialRequests,
	initialPagination,
	currentSearch,
	currentStatus,
}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [search, setSearch] = useState(currentSearch);
	const [actionLoading, setActionLoading] = useState<string | null>(null);
	const [error, setError] = useState("");

	function pushParams(overrides: Record<string, string>) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", "certifications");
		Object.entries(overrides).forEach(([k, v]) => {
			if (v) params.set(k, v);
			else params.delete(k);
		});
		params.delete("page");
		startTransition(() => {
			router.push(`/agro-admin/agro-users?${params.toString()}`);
		});
	}

	function handleSearchSubmit(e: React.FormEvent) {
		e.preventDefault();
		pushParams({ csearch: search.trim(), cstatus: currentStatus });
	}

	function handleStatusChange(status: string) {
		pushParams({ cstatus: status, csearch: currentSearch });
	}

	function handlePageChange(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", "certifications");
		params.set("cpage", String(page));
		startTransition(() => {
			router.push(`/agro-admin/agro-users?${params.toString()}`);
		});
	}

	async function handleApprove(userId: string) {
		setActionLoading(userId);
		setError("");
		try {
			await approveCertification(userId);
			router.refresh();
		} catch (err) {
			setError(getApiErrorMessage(err));
		} finally {
			setActionLoading(null);
		}
	}

	async function handleReject(userId: string) {
		setActionLoading(userId);
		setError("");
		try {
			await rejectCertification(userId);
			router.refresh();
		} catch (err) {
			setError(getApiErrorMessage(err));
		} finally {
			setActionLoading(null);
		}
	}

	const statusTabs = [
		{ value: "", label: "Toutes" },
		{ value: "pending", label: "En attente" },
		{ value: "approved", label: "Approuvées" },
		{ value: "rejected", label: "Rejetées" },
	];

	return (
		<div className="space-y-4">
			{/* Status Tabs */}
			<div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
				{statusTabs.map((tab) => (
					<button
						key={tab.value}
						onClick={() => handleStatusChange(tab.value)}
						className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
							currentStatus === tab.value
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Search */}
			<form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
				<div className="relative w-72">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						placeholder="Rechercher un vendeur..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
					/>
				</div>
				{isPending && <Loader2 className="w-4 h-4 animate-spin text-brand-green" />}
			</form>

			{error && (
				<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
					{error}
				</p>
			)}

			{/* Table */}
			<div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Vendeur
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Pays
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Statut
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Document
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Date demande
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{initialRequests.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
										Aucune demande de certification trouvée
									</td>
								</tr>
							) : (
								initialRequests.map((req) => (
									<tr
										key={req._id}
										className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
									>
										<td className="px-4 py-3">
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center overflow-hidden">
													{req.profileImage ? (
														<Image
															src={getImageUrl(req.profileImage)}
															alt={req.fullName}
															width={32}
															height={32}
															className="w-full h-full object-cover"
															unoptimized
														/>
													) : (
														<span className="text-brand-green font-semibold text-xs">
															{req.fullName
																.split(" ")
																.map((n) => n[0])
																.join("")
																.slice(0, 2)}
														</span>
													)}
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{req.fullName}
													</p>
													<p className="text-xs text-gray-400">{req.email}</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm text-gray-600">
											{req.country}
										</td>
										<td className="px-4 py-3">
											<StatusBadge status={req.certificationStatus} />
										</td>
										<td className="px-4 py-3">
											{req.certificationDocument ? (
												<a
													href={getImageUrl(req.certificationDocument)}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1 text-xs text-brand-green hover:underline"
												>
													Voir <ExternalLink className="w-3 h-3" />
												</a>
											) : (
												<span className="text-xs text-gray-400">—</span>
											)}
										</td>
										<td className="px-4 py-3 text-sm text-gray-500">
											{formatDate(req.certificationRequestDate)}
										</td>
										<td className="px-4 py-3">
											{req.certificationStatus === "pending" ? (
												<div className="flex items-center gap-1.5">
													<button
														onClick={() => handleApprove(req._id)}
														disabled={actionLoading === req._id}
														className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50"
														title="Approuver"
													>
														{actionLoading === req._id ? (
															<Loader2 className="w-3 h-3 animate-spin" />
														) : (
															<Check className="w-3 h-3" />
														)}
														Approuver
													</button>
													<button
														onClick={() => handleReject(req._id)}
														disabled={actionLoading === req._id}
														className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
														title="Rejeter"
													>
														<X className="w-3 h-3" />
														Rejeter
													</button>
												</div>
											) : (
												<span className="text-xs text-gray-400">
													{req.certificationReviewDate
														? `Traité le ${formatDate(req.certificationReviewDate)}`
														: "—"}
												</span>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{initialPagination.pages > 1 && (
					<div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
						<p className="text-sm text-gray-500">
							{initialPagination.total} demande{initialPagination.total > 1 ? "s" : ""}
						</p>
						<div className="flex items-center gap-2">
							<button
								onClick={() => handlePageChange(initialPagination.page - 1)}
								disabled={initialPagination.page <= 1 || isPending}
								className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<span className="text-sm text-gray-600 px-2">
								{initialPagination.page} / {initialPagination.pages}
							</span>
							<button
								onClick={() => handlePageChange(initialPagination.page + 1)}
								disabled={initialPagination.page >= initialPagination.pages || isPending}
								className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
