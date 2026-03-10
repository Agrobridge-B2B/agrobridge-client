"use client";

import {
	Users,
	UserPlus,
	UserCheck,
	UserX,
	Search,
	Filter,
	MoreVertical,
	ChevronLeft,
	ChevronRight,
	Edit2,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";

const stats = [
	{
		label: "Total Users",
		value: "12,845",
		icon: Users,
		color: "bg-blue-100 text-blue-600",
	},
	{
		label: "New This Month",
		value: "342",
		icon: UserPlus,
		color: "bg-green-100 text-green-600",
	},
	{
		label: "Active Users",
		value: "10,231",
		icon: UserCheck,
		color: "bg-emerald-100 text-emerald-600",
	},
	{
		label: "Suspended",
		value: "48",
		icon: UserX,
		color: "bg-red-100 text-red-600",
	},
];

const allUsers = [
	{
		id: "USR-001",
		name: "Ahmed Benali",
		email: "ahmed@ecofarm.ma",
		role: "Seller",
		status: "Certified",
		country: "Morocco",
		joined: "2024-01-15",
	},
	{
		id: "USR-002",
		name: "Sarah Johnson",
		email: "sarah@freshbuy.eu",
		role: "Buyer",
		status: "Certified",
		country: "United Kingdom",
		joined: "2024-02-20",
	},
	{
		id: "USR-003",
		name: "Kwame Asante",
		email: "kwame@agritech.gh",
		role: "Seller",
		status: "Certified",
		country: "Ghana",
		joined: "2024-03-10",
	},
	{
		id: "USR-004",
		name: "Maria Silva",
		email: "maria@import.pt",
		role: "Buyer",
		status: "Suspended",
		country: "Portugal",
		joined: "2024-04-05",
	},
	{
		id: "USR-005",
		name: "John Mwangi",
		email: "john@kenyafarms.ke",
		role: "Seller",
		status: "Certified",
		country: "Kenya",
		joined: "2024-05-18",
	},
	{
		id: "USR-006",
		name: "Fatima Zahra",
		email: "fatima@biomaroc.ma",
		role: "Seller",
		status: "Not Certified",
		country: "Morocco",
		joined: "2024-06-22",
	},
	{
		id: "USR-007",
		name: "Pierre Dubois",
		email: "pierre@eurofoods.fr",
		role: "Buyer",
		status: "Certified",
		country: "France",
		joined: "2024-07-14",
	},
	{
		id: "USR-008",
		name: "Amina Hassan",
		email: "amina@nileagro.eg",
		role: "Seller",
		status: "Certified",
		country: "Egypt",
		joined: "2024-08-03",
	},
	{
		id: "USR-009",
		name: "Carlos Rodriguez",
		email: "carlos@iberiafoods.es",
		role: "Buyer",
		status: "Certified",
		country: "Spain",
		joined: "2024-08-19",
	},
	{
		id: "USR-010",
		name: "Chinwe Okafor",
		email: "chinwe@nigeriafarms.ng",
		role: "Seller",
		status: "Not Certified",
		country: "Nigeria",
		joined: "2024-09-05",
	},
	{
		id: "USR-011",
		name: "Hans Mueller",
		email: "hans@germanbuy.de",
		role: "Buyer",
		status: "Certified",
		country: "Germany",
		joined: "2024-09-12",
	},
	{
		id: "USR-012",
		name: "Youssef El Amrani",
		email: "youssef@casablancaagri.ma",
		role: "Seller",
		status: "Suspended",
		country: "Morocco",
		joined: "2024-09-28",
	},
	{
		id: "USR-013",
		name: "Emma Thompson",
		email: "emma@ukimports.co.uk",
		role: "Buyer",
		status: "Certified",
		country: "United Kingdom",
		joined: "2024-10-07",
	},
	{
		id: "USR-014",
		name: "Ibrahim Diallo",
		email: "ibrahim@senegalagro.sn",
		role: "Seller",
		status: "Certified",
		country: "Senegal",
		joined: "2024-10-15",
	},
	{
		id: "USR-015",
		name: "Sofia Papadopoulos",
		email: "sofia@greekfoods.gr",
		role: "Buyer",
		status: "Certified",
		country: "Greece",
		joined: "2024-10-22",
	},
];

type User = typeof allUsers[0];
type Role = "Seller" | "Buyer";
type Status = "Certified" | "Not Certified" | "Suspended";

export default function UsersManagementPage() {
	const [users, setUsers] = useState<User[]>(allUsers);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterRole, setFilterRole] = useState<string>("all");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterCountry, setFilterCountry] = useState<string>("all");
	const [filterDateFrom, setFilterDateFrom] = useState<string>("");
	const [filterDateTo, setFilterDateTo] = useState<string>("");
	const [showFilters, setShowFilters] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

	const usersPerPage = 7;

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.id.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesRole = filterRole === "all" || user.role === filterRole;
		const matchesStatus = filterStatus === "all" || user.status === filterStatus;
		const matchesCountry = filterCountry === "all" || user.country === filterCountry;

		const matchesDate =
			(!filterDateFrom || user.joined >= filterDateFrom) &&
			(!filterDateTo || user.joined <= filterDateTo);

		return matchesSearch && matchesRole && matchesStatus && matchesCountry && matchesDate;
	});

	const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
	const startIndex = (currentPage - 1) * usersPerPage;
	const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

	const uniqueCountries = Array.from(new Set(allUsers.map((u) => u.country))).sort();

	const handleRoleChange = (userId: string, newRole: Role) => {
		setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
		setEditingUser(null);
	};

	const handleStatusChange = (userId: string, newStatus: Status) => {
		setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
		setEditingUser(null);
	};

	const handleDeleteUser = (userId: string) => {
		setUsers(users.filter((u) => u.id !== userId));
		setShowDeleteConfirm(null);
		if (paginatedUsers.length === 1 && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const resetFilters = () => {
		setFilterRole("all");
		setFilterStatus("all");
		setFilterCountry("all");
		setFilterDateFrom("");
		setFilterDateTo("");
		setCurrentPage(1);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-brand-dark">
						Users Management
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Manage all registered users on the platform
					</p>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green-dark transition-colors"
				>
					<UserPlus className="w-4 h-4" />
					Add User
				</button>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
						>
							<div
								className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
							>
								<Icon className="w-5 h-5" />
							</div>
							<div>
								<p className="text-xs text-gray-500">{stat.label}</p>
								<p className="text-lg font-bold text-brand-dark">
									{stat.value}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Table */}
			<div className="bg-white rounded-xl border border-gray-100">
				{/* Table Header */}
				<div className="p-4 border-b border-gray-100 space-y-4">
					<div className="flex items-center justify-between">
						<div className="relative w-72">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search users..."
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setCurrentPage(1);
								}}
								className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
							/>
						</div>
						<button
							type="button"
							onClick={() => setShowFilters(!showFilters)}
							className={`flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
								showFilters ? "bg-brand-green text-white hover:bg-brand-green-dark" : "text-gray-600"
							}`}
						>
							<Filter className="w-4 h-4" />
							Filters
						</button>
					</div>

					{/* Filters Panel */}
					{showFilters && (
						<div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg">
							<div>
								<label className="text-xs font-medium text-gray-600 block mb-1.5">Role</label>
								<select
									value={filterRole}
									onChange={(e) => {
										setFilterRole(e.target.value);
										setCurrentPage(1);
									}}
									className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								>
									<option value="all">All Roles</option>
									<option value="Seller">Seller</option>
									<option value="Buyer">Buyer</option>
								</select>
							</div>

							<div>
								<label className="text-xs font-medium text-gray-600 block mb-1.5">Status</label>
								<select
									value={filterStatus}
									onChange={(e) => {
										setFilterStatus(e.target.value);
										setCurrentPage(1);
									}}
									className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								>
									<option value="all">All Statuses</option>
									<option value="Certified">Certified</option>
									<option value="Not Certified">Not Certified</option>
									<option value="Suspended">Suspended</option>
								</select>
							</div>

							<div>
								<label className="text-xs font-medium text-gray-600 block mb-1.5">Country</label>
								<select
									value={filterCountry}
									onChange={(e) => {
										setFilterCountry(e.target.value);
										setCurrentPage(1);
									}}
									className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								>
									<option value="all">All Countries</option>
									{uniqueCountries.map((country) => (
										<option key={country} value={country}>
											{country}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="text-xs font-medium text-gray-600 block mb-1.5">From Date</label>
								<input
									type="date"
									value={filterDateFrom}
									onChange={(e) => {
										setFilterDateFrom(e.target.value);
										setCurrentPage(1);
									}}
									className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								/>
							</div>

							<div>
								<label className="text-xs font-medium text-gray-600 block mb-1.5">To Date</label>
								<input
									type="date"
									value={filterDateTo}
									onChange={(e) => {
										setFilterDateTo(e.target.value);
										setCurrentPage(1);
									}}
									className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								/>
							</div>

							<div className="md:col-span-5 flex justify-end">
								<button
									type="button"
									onClick={resetFilters}
									className="text-sm text-brand-green hover:text-brand-green-dark font-medium"
								>
									Reset Filters
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Table Content */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									User ID
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Name
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Email
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Country
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Role
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Status
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Joined
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedUsers.length === 0 ? (
								<tr>
									<td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-500">
										No users found matching your filters.
									</td>
								</tr>
							) : (
								paginatedUsers.map((user) => (
								<tr
									key={user.id}
									className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-4 py-3 text-sm text-gray-500 font-mono">
										{user.id}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-semibold text-xs">
												{user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</div>
											<span className="text-sm font-medium text-brand-dark">
												{user.name}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{user.email}
									</td>
									<td className="px-4 py-3 text-sm text-gray-600">
										{user.country}
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												user.role === "Seller"
													? "bg-blue-100 text-blue-700"
													: "bg-purple-100 text-purple-700"
											}`}
										>
											{user.role}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full ${
												user.status === "Certified"
													? "bg-green-100 text-green-700"
													: user.status === "Suspended"
														? "bg-red-100 text-red-700"
														: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{user.status}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-500">
										{user.joined}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => setEditingUser(user)}
												className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
												title="Edit user"
											>
												<Edit2 className="w-4 h-4" />
											</button>
											<button
												type="button"
												onClick={() => setShowDeleteConfirm(user.id)}
												className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
												title="Delete user"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{filteredUsers.length > 0 && (
					<div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
						<p className="text-sm text-gray-500">
							Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
							{filteredUsers.length} users
						</p>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage === 1}
								className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>

							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<button
										key={page}
										type="button"
										onClick={() => setCurrentPage(page)}
										className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
											currentPage === page
												? "bg-brand-green text-white"
												: "text-gray-600 hover:bg-gray-100"
										}`}
									>
										{page}
									</button>
								))}
							</div>

							<button
								type="button"
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Edit User Modal */}
			{editingUser && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold text-brand-dark">Edit User</h3>
							<button
								type="button"
								onClick={() => setEditingUser(null)}
								className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<p className="text-sm text-gray-600 mb-1">User: <span className="font-medium text-brand-dark">{editingUser.name}</span></p>
								<p className="text-xs text-gray-500">{editingUser.email}</p>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-700 block mb-2">Change Role</label>
								<div className="flex gap-2">
									{(["Seller", "Buyer"] as Role[]).map((role) => (
										<button
											key={role}
											type="button"
											onClick={() => handleRoleChange(editingUser.id, role)}
											className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
												editingUser.role === role
													? "bg-brand-green text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
										>
											{role}
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-700 block mb-2">Change Status</label>
								<div className="flex gap-2">
									{(["Certified", "Not Certified", "Suspended"] as Status[]).map((status) => (
										<button
											key={status}
											type="button"
											onClick={() => handleStatusChange(editingUser.id, status)}
											className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
												editingUser.status === status
													? status === "Certified"
														? "bg-green-600 text-white"
														: status === "Suspended"
															? "bg-red-600 text-white"
															: "bg-yellow-600 text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
										>
											{status}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold text-brand-dark">Delete User</h3>
							<button
								type="button"
								onClick={() => setShowDeleteConfirm(null)}
								className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<p className="text-sm text-gray-600">
							Are you sure you want to delete user{" "}
							<span className="font-medium text-brand-dark">
								{users.find((u) => u.id === showDeleteConfirm)?.name}
							</span>
							? This action cannot be undone.
						</p>

						<div className="flex gap-3 justify-end">
							<button
								type="button"
								onClick={() => setShowDeleteConfirm(null)}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => handleDeleteUser(showDeleteConfirm)}
								className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
							>
								Delete User
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
