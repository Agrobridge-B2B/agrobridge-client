"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Building2, Phone } from "lucide-react";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");

	return (
		<form className={cn("flex flex-col gap-3", className)} {...props}>
			<div className="flex flex-col items-center gap-2">
				{/* Logo */}
				<Link href="/">
					<img
						src="/logo/agrobridge-01.svg"
						alt="Agrobridge Logo"
						className="w-24 h-auto"
					/>
				</Link>

				{/* Title */}
				<div className="text-center">
					<h1 className="text-xl lg:text-2xl font-bold text-brand-green mb-1">
						Créer un Compte
					</h1>
				</div>

				{/* Account Type Selection */}
				<div className="w-full grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
					<button
						type="button"
						onClick={() => setAccountType("buyer")}
						className={cn(
							"py-2 px-3 rounded-md font-medium text-sm transition-all",
							accountType === "buyer"
								? "bg-brand-green text-white shadow-sm"
								: "text-gray-600 hover:text-gray-900",
						)}
					>
						Acheteur
					</button>
					<button
						type="button"
						onClick={() => setAccountType("seller")}
						className={cn(
							"py-2 px-3 rounded-md font-medium text-sm transition-all",
							accountType === "seller"
								? "bg-brand-green text-white shadow-sm"
								: "text-gray-600 hover:text-gray-900",
						)}
					>
						Vendeur
					</button>
				</div>

				{/* Form Fields */}
				<div className="w-full space-y-3">
					{/* Full Name */}
					<div className="space-y-1">
						<Label
							htmlFor="fullName"
							className="text-xs font-medium text-gray-700"
						>
							Nom Complet
						</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="fullName"
								type="text"
								placeholder="Votre nom complet"
								required
								className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Email */}
					<div className="space-y-1">
						<Label
							htmlFor="email"
							className="text-xs font-medium text-gray-700"
						>
							Email
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="email"
								type="email"
								placeholder="votre@email.com"
								required
								className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Company Name (for sellers) */}
					{accountType === "seller" && (
						<div className="space-y-1">
							<Label
								htmlFor="company"
								className="text-xs font-medium text-gray-700"
							>
								Nom de l'Entreprise
							</Label>
							<div className="relative">
								<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<Input
									id="company"
									type="text"
									placeholder="Nom de votre entreprise"
									required
									className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
								/>
							</div>
						</div>
					)}

					{/* Password */}
					<div className="space-y-1">
						<Label
							htmlFor="password"
							className="text-xs font-medium text-gray-700"
						>
							Mot de Passe
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Minimum 8 caractères"
								required
								className="h-10 pl-9 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					{/* Confirm Password */}
					<div className="space-y-1">
						<Label
							htmlFor="confirmPassword"
							className="text-xs font-medium text-gray-700"
						>
							Confirmer le Mot de Passe
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirmez votre mot de passe"
								required
								className="h-10 pl-9 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showConfirmPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					{/* Terms and Conditions */}
					<div className="flex items-start gap-2 pt-1">
						<input
							type="checkbox"
							id="terms"
							required
							className="mt-0.5 w-3.5 h-3.5 text-brand-green border-gray-300 rounded focus:ring-brand-green"
						/>
						<label
							htmlFor="terms"
							className="text-[11px] text-gray-600 leading-tight"
						>
							J'accepte les{" "}
							<Link
								href="/terms"
								className="text-brand-green hover:underline font-medium"
							>
								Conditions
							</Link>{" "}
							et la{" "}
							<Link
								href="/privacy"
								className="text-brand-green hover:underline font-medium"
							>
								Politique
							</Link>
						</label>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full h-10 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all mt-1"
					>
						Créer mon Compte
					</Button>

					{/* Login Link */}
					<div className="text-center pt-1">
						<span className="text-xs text-gray-600">
							Vous avez déjà un compte ?{" "}
							<Link
								href="/login"
								className="text-brand-green font-semibold hover:underline transition-all"
							>
								Connectez-vous
							</Link>
						</span>
					</div>
				</div>
			</div>
		</form>
	);
}
