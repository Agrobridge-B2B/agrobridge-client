import { Sidebar } from "@/components/seller/Sidebar";
import { DashboardHeader } from "@/components/seller/DashboardHeader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SellerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute allowedRoles={["seller"]}>
			<div className="flex min-h-screen bg-gray-50">
				<Sidebar />
				<div className="flex-1 flex flex-col">
					<DashboardHeader />
					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</ProtectedRoute>
	);
}
