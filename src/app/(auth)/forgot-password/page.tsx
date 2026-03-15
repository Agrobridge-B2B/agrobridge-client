"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			setIsSubmitting(true);
			const response = await forgotPassword({
				email: email.trim().toLowerCase(),
			});

			const message = response.message;
			setSuccessMessage(
				typeof message === "string" && message.trim().length > 0
					? message
					: "Reset link sent. Please check your inbox.",
			);
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
				<h1 className="text-2xl font-bold text-brand-green">Forgot Password</h1>
				<p className="mt-2 text-sm text-gray-600">
					Enter your account email to receive a password reset link.
				</p>

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
						<Label htmlFor="email" className="text-sm font-medium text-gray-700">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="votre@email.com"
							required
							disabled={isSubmitting}
							className="h-11 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
						/>
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full h-11 bg-brand-green hover:bg-brand-green-dark text-white font-semibold"
					>
						{isSubmitting ? "Sending..." : "Send Reset Link"}
					</Button>
				</form>

				<div className="mt-5 text-sm text-gray-600">
					Remembered your password?{" "}
					<Link
						href="/login"
						className="text-brand-green font-semibold hover:underline"
					>
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
