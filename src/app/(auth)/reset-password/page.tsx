"use client";

import { type FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (!token) {
			setErrorMessage("Reset token is missing.");
			return;
		}

		if (password.length < 8) {
			setErrorMessage("Password must be at least 8 characters.");
			return;
		}

		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match.");
			return;
		}

		try {
			setIsSubmitting(true);
			const response = await resetPassword({
				token,
				password,
			});

			const message = response.message;
			setSuccessMessage(
				typeof message === "string" && message.trim().length > 0
					? message
					: "Password reset successful.",
			);
			setPassword("");
			setConfirmPassword("");
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
			<h1 className="text-2xl font-bold text-brand-green">Reset Password</h1>
			<p className="mt-2 text-sm text-gray-600">
				Set a new password for your account.
			</p>

			{!token && (
				<div
					className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
					role="alert"
				>
					Invalid reset link. Please request a new one.
				</div>
			)}

			<form className="mt-5 space-y-4" onSubmit={handleSubmit}>
				{errorMessage && (
					<div
						className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
						role="alert"
					>
						{errorMessage}
					</div>
				)}

				{successMessage && (
					<div
						className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700"
						role="status"
					>
						{successMessage}
					</div>
				)}

				<div className="space-y-2">
					<Label htmlFor="password" className="text-sm font-medium text-gray-700">
						New Password
					</Label>
					<Input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Minimum 8 characters"
						required
						disabled={isSubmitting || !token}
						className="h-11 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
					/>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="confirmPassword"
						className="text-sm font-medium text-gray-700"
					>
						Confirm Password
					</Label>
					<Input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						placeholder="Repeat new password"
						required
						disabled={isSubmitting || !token}
						className="h-11 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
					/>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting || !token}
					className="w-full h-11 bg-brand-green hover:bg-brand-green-dark text-white font-semibold"
				>
					{isSubmitting ? "Saving..." : "Reset Password"}
				</Button>
			</form>

			<div className="mt-5 text-sm text-gray-600">
				Back to{" "}
				<Link
					href="/login"
					className="text-brand-green font-semibold hover:underline"
				>
					Login
				</Link>
			</div>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
			<Suspense
				fallback={
					<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md text-sm text-gray-600">
						Loading reset link...
					</div>
				}
			>
				<ResetPasswordContent />
			</Suspense>
		</div>
	);
}
