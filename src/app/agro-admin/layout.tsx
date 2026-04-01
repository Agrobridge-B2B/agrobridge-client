import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute allowedRoles={["admin"]}>
			<div className="flex min-h-screen bg-gray-50 font-montserrat">
				<AdminSidebar />
				<div className="flex-1 flex flex-col min-w-0">
					<AdminNavbar />
					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</ProtectedRoute>
	);
}
