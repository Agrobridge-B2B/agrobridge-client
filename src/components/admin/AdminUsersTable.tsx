"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
	Search,
	Loader2,
	ChevronLeft,
	ChevronRight,
	ShieldCheck,
	User,
	Trash2,
	X,
} from "lucide-react";
import { getImageUrl } from "@/lib/upload";
import { deleteUser } from "@/lib/admin/users";
import { getApiErrorMessage } from "@/lib/api";
import type { AdminUser } from "@/lib/server/users";

interface Pagination {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface Props {
	initialUsers: AdminUser[];
	initialPagination: Pagination;
	currentSearch: string;
	currentRole: string;
}

function RoleBadge({ role }: { role: string }) {
	const styles: Record<string, string> = {
		admin: "bg-purple-100 text-purple-700",
		seller: "bg-blue-100 text-blue-700",
		buyer: "bg-emerald-100 text-emerald-700",
	};
	return (
		<span
			className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
				styles[role] ?? "bg-gray-100 text-gray-600"
			}`}
		>
			{role}
		</span>
	);
}

function CertBadge({ isCertified, certificationStatus }: { isCertified: boolean; certificationStatus: string }) {
	if (isCertified) {
		return (
			<span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
				<ShieldCheck className="w-3 h-3" /> Certifié
			</span>
		);
	}
	if (certificationStatus === "pending") {
		return (
			<span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full">
				En attente
			</span>
		);
	}
	if (certificationStatus === "rejected") {
		return (
			<span className="text-xs font-medium text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
				Rejeté
			</span>
		);
	}
	return (
		<span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
			Non certifié
		</span>
	);
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function AdminUsersTable({
	initialUsers,
	initialPagination,
	currentSearch,
	currentRole,
}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [search, setSearch] = useState(currentSearch);
	const [actionLoading, setActionLoading] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null);

	function pushParams(overrides: Record<string, string>) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", "users");
		Object.entries(overrides).forEach(([k, v]) => {
			if (v) params.set(k, v);
			else params.delete(k);
		});
		params.delete("upage");
		startTransition(() => {
			router.push(`/agro-admin/agro-users?${params.toString()}`);
		});
	}

	function handleSearchSubmit(e: React.FormEvent) {
		e.preventDefault();
		pushParams({ usearch: search.trim(), urole: currentRole });
	}

	function handleRoleChange(role: string) {
		pushParams({ urole: role, usearch: currentSearch });
	}

	function handlePageChange(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", "users");
		params.set("upage", String(page));
		startTransition(() => {
			router.push(`/agro-admin/agro-users?${params.toString()}`);
		});
	}

	const roleTabs = [
		{ value: "", label: "Tous" },
		{ value: "seller", label: "Vendeurs" },
		{ value: "buyer", label: "Acheteurs" },
		{ value: "admin", label: "Admins" },
	];

	return (
		<div className="space-y-4">
			{/* Role Tabs */}
			<div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
				{roleTabs.map((tab) => (
					<button
						key={tab.value}
						onClick={() => handleRoleChange(tab.value)}
						className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
							currentRole === tab.value
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Search */}
			{error && (
				<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
					{error}
				</p>
			)}
			<form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
				<div className="relative w-72">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						placeholder="Rechercher un utilisateur..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
					/>
				</div>
				{isPending && <Loader2 className="w-4 h-4 animate-spin text-brand-green" />}
			</form>

			{/* Table */}
			<div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Utilisateur
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Pays
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Rôle
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Certification
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Inscrit le
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{initialUsers.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
										Aucun utilisateur trouvé
									</td>
								</tr>
							) : (
								initialUsers.map((u) => (
									<tr
										key={u._id}
										className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
									>
										<td className="px-4 py-3">
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center overflow-hidden">
													{u.profileImage ? (
														<Image
															src={getImageUrl(u.profileImage)}
															alt={u.fullName}
															width={32}
															height={32}
															className="w-full h-full object-cover"
															unoptimized
														/>
													) : (
														<User className="w-4 h-4 text-brand-green" />
													)}
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														{u.fullName}
													</p>
													<p className="text-xs text-gray-400">{u.email}</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm text-gray-600">
											{u.country}
										</td>
										<td className="px-4 py-3">
											<RoleBadge role={u.role} />
										</td>
										<td className="px-4 py-3">
											<CertBadge
												isCertified={u.isCertified}
												certificationStatus={u.certificationStatus}
											/>
										</td>
										<td className="px-4 py-3 text-sm text-gray-500">
											{formatDate(u.createdAt)}
										</td>
										<td className="px-4 py-3">
											{u.role !== "admin" && (
												<button
													onClick={() => setConfirmDelete(u)}
													disabled={actionLoading === u._id}
													className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
													title="Supprimer"
												>
													{actionLoading === u._id ? (
														<Loader2 className="w-4 h-4 animate-spin" />
													) : (
														<Trash2 className="w-4 h-4" />
													)}
												</button>
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
							{initialPagination.total} utilisateur{initialPagination.total > 1 ? "s" : ""}
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
			{/* Delete Confirmation Modal */}
			{confirmDelete && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold text-gray-900">Supprimer l&apos;utilisateur</h3>
							<button
								onClick={() => setConfirmDelete(null)}
								className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<p className="text-sm text-gray-600">
							Êtes-vous sûr de vouloir supprimer{" "}
							<span className="font-medium text-gray-900">{confirmDelete.fullName}</span>
							{" "}({confirmDelete.email}) ? Cette action est irréversible.
						</p>
						<div className="flex gap-3 justify-end">
							<button
								onClick={() => setConfirmDelete(null)}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
							>
								Annuler
							</button>
							<button
								onClick={async () => {
									const userId = confirmDelete._id;
									setConfirmDelete(null);
									setActionLoading(userId);
									setError("");
									try {
										await deleteUser(userId);
										router.refresh();
									} catch (err) {
										setError(getApiErrorMessage(err));
									} finally {
										setActionLoading(null);
									}
								}}
								className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
							>
								Supprimer
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
