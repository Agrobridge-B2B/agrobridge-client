"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [needsVerification, setNeedsVerification] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setNeedsVerification(false);
		setIsLoading(true);

		const result = await login(email, password);

		if (result.success) {
			// Redirect based on user role
			const userRole = result.user?.role;
			if (userRole === "admin") {
				router.push("/agro-admin");
			} else if (userRole === "seller") {
				router.push("/seller/dashboard");
			} else if (userRole === "buyer") {
				router.push("/buyer/dashboard");
			} else {
				router.push("/");
			}
		} else {
			if (result.code === "EMAIL_NOT_VERIFIED") {
				setNeedsVerification(true);
			}
			setError(result.message);
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
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
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
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
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
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

					{/* Error Message */}
					{error && (
						<div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
							<p>{error}</p>
							{needsVerification && (
								<Link
									href={`/resend-verification?email=${encodeURIComponent(email)}`}
									className="mt-1 block text-brand-green font-medium hover:underline"
								>
									Resend verification email
								</Link>
							)}
						</div>
					)}

					{/* Login Button */}
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-60"
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2">
								<Loader2 className="w-5 h-5 animate-spin" />
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
