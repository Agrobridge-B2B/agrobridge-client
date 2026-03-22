import { Suspense } from "react";
import { Loader2, Users, ShieldCheck } from "lucide-react";
import { fetchAdminUsers, fetchCertificationRequests } from "@/lib/server/users";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { AdminCertificationsTable } from "@/components/admin/AdminCertificationsTable";
import { AdminUsersPageTabs } from "@/components/admin/AdminUsersPageTabs";

interface PageProps {
	searchParams: Promise<{
		tab?: string;
		upage?: string;
		usearch?: string;
		urole?: string;
		cpage?: string;
		csearch?: string;
		cstatus?: string;
	}>;
}

function PageLoading() {
	return (
		<div className="flex items-center justify-center py-20">
			<Loader2 className="w-8 h-8 animate-spin text-brand-green" />
		</div>
	);
}

async function UsersContent({ searchParams }: PageProps) {
	const params = await searchParams;
	const activeTab = params.tab === "certifications" ? "certifications" : "users";

	// Users tab data
	const upage = Math.max(1, parseInt(params.upage ?? "1", 10) || 1);
	const usearch = params.usearch ?? "";
	const urole = params.urole ?? "";

	// Certification tab data
	const cpage = Math.max(1, parseInt(params.cpage ?? "1", 10) || 1);
	const csearch = params.csearch ?? "";
	const cstatus = params.cstatus ?? "";

	try {
		const [usersData, certsData] = await Promise.all([
			fetchAdminUsers({
				page: upage,
				limit: 6,
				role: urole || undefined,
				search: usearch || undefined,
			}),
			fetchCertificationRequests({
				page: cpage,
				limit: 6,
				status: cstatus || undefined,
				search: csearch || undefined,
			}),
		]);

		return (
			<>
				<AdminUsersPageTabs
					activeTab={activeTab}
					usersCount={usersData.pagination.total}
					certsCount={certsData.pagination.total}
				/>

				{activeTab === "users" ? (
					<AdminUsersTable
						initialUsers={usersData.users}
						initialPagination={usersData.pagination}
						currentSearch={usearch}
						currentRole={urole}
					/>
				) : (
					<AdminCertificationsTable
						initialRequests={certsData.requests}
						initialPagination={certsData.pagination}
						currentSearch={csearch}
						currentStatus={cstatus}
					/>
				)}
			</>
		);
	} catch {
		return (
			<div className="text-center py-16">
				<p className="text-red-600 mb-2 font-medium">
					Impossible de charger les données
				</p>
				<p className="text-sm text-gray-500">
					Vérifiez que le serveur est en cours d&apos;exécution et réessayez.
				</p>
			</div>
		);
	}
}

export default function UsersManagementPage({ searchParams }: PageProps) {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">
					Gestion des utilisateurs
				</h1>
				<p className="text-sm text-gray-500 mt-1">
					Gérez les utilisateurs et les demandes de certification
				</p>
			</div>

			<Suspense fallback={<PageLoading />}>
				<UsersContent searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
