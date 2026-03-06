"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
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
						<Label htmlFor="email" className="text-sm font-medium text-gray-700">
							Email
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								id="email"
								type="email"
								placeholder="votre@email.com"
								required
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
						className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base shadow-md hover:shadow-lg transition-all"
					>
						Se Connecter
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
