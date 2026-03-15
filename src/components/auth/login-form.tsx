"use client";

import { cn } from "@/lib/utils";
import { getApiErrorMessage } from "@/lib/api";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	function readToken(payload: Record<string, unknown>): string | null {
		const token = payload.token;
		if (typeof token === "string" && token.trim().length > 0) {
			return token;
		}

		const accessToken = payload.accessToken;
		if (typeof accessToken === "string" && accessToken.trim().length > 0) {
			return accessToken;
		}

		const nested = payload.data;
		if (nested && typeof nested === "object") {
			const nestedToken = (nested as { token?: unknown }).token;
			if (typeof nestedToken === "string" && nestedToken.trim().length > 0) {
				return nestedToken;
			}
		}

		return null;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			setIsSubmitting(true);
			const response = await login({
				email: email.trim().toLowerCase(),
				password,
			});

			const token = readToken(response);
			if (token) {
				localStorage.setItem("agrobridge_auth_token", token);
			}

			setSuccessMessage("Connexion réussie.");
			router.push("/dashboard");
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={handleSubmit}
			{...props}
		>
			<div className="flex flex-col items-center gap-6">
				{/* Logo */}
				<Link href="/">
					<img
						src="/logo/agrobridge-01.svg"
						alt="Agrobridge Logo"
						className="w-32 h-auto"
					/>
				</Link>

				{/* Title */}
				<div className="text-center">
					<h1 className="text-2xl lg:text-3xl font-bold text-brand-green mb-2">
						Content de te revoir !
					</h1>
					<p className="text-sm text-gray-600">
						Connectez-vous pour accéder à votre compte
					</p>
				</div>

				{/* Form Fields Container */}
				<div className="w-full space-y-5 mt-4">
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

					{/* Email Input */}
					<div className="space-y-2">
						<Label
							htmlFor="email"
							className="text-sm font-medium text-gray-700"
						>
							Email
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								id="email"
								type="email"
								placeholder="votre@email.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								disabled={isSubmitting}
								className="h-12 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Password Input */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label
								htmlFor="password"
								className="text-sm font-medium text-gray-700"
							>
								Mot de Passe
							</Label>
							<Link
								href="/forgot-password"
								className="text-xs text-brand-green hover:underline font-medium"
							>
								Mot de passe oublié ?
							</Link>
						</div>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Votre mot de passe"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								disabled={isSubmitting}
								className="h-12 pl-10 pr-12 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5" />
								) : (
									<Eye className="w-5 h-5" />
								)}
							</button>
						</div>
					</div>

					{/* Remember Me */}
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="remember"
							className="w-4 h-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
						/>
						<label htmlFor="remember" className="text-sm text-gray-600">
							Se souvenir de moi
						</label>
					</div>

					{/* Login Button */}
					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base shadow-md hover:shadow-lg transition-all"
					>
						{isSubmitting ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								Connexion...
							</span>
						) : (
							"Se Connecter"
						)}
					</Button>

					{/* Divider */}
					<div className="relative py-4">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200"></div>
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-white px-2 text-gray-500">OU</span>
						</div>
					</div>

					{/* Sign up link */}
					<div className="text-center">
						<span className="text-sm text-gray-600">
							Vous n'avez pas de compte ?{" "}
							<Link
								href="/register"
								className="text-brand-green font-semibold hover:underline transition-all"
							>
								Inscrivez-vous
							</Link>
						</span>
					</div>
				</div>
			</div>
		</form>
	);
}
