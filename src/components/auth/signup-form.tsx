"use client";

import { cn } from "@/lib/utils";
import { getApiErrorMessage } from "@/lib/api";
import { register } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import {
	Building2,
	Eye,
	EyeOff,
	Globe2,
	Loader2,
	Lock,
	Mail,
	User,
} from "lucide-react";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [company, setCompany] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const isSeller = accountType === "seller";

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (password.length < 8) {
			setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
			return;
		}

		if (password !== confirmPassword) {
			setErrorMessage("Les mots de passe ne correspondent pas.");
			return;
		}

		if (!termsAccepted) {
			setErrorMessage("Vous devez accepter les conditions et la politique.");
			return;
		}

		if (isSeller && company.trim().length === 0) {
			setErrorMessage("Le nom de l'entreprise est requis pour un vendeur.");
			return;
		}

		try {
			setIsSubmitting(true);
			await register({
				fullName: fullName.trim(),
				email: email.trim().toLowerCase(),
				password,
				country: country.trim(),
				role: accountType,
			});
			setSuccessMessage(
				"Compte créé. Vérifiez votre email pour activer votre compte.",
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
		<form
			className={cn("flex flex-col gap-3", className)}
			onSubmit={handleSubmit}
			{...props}
		>
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
					{errorMessage && (
						<div
							className="rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700"
							role="alert"
						>
							{errorMessage}
						</div>
					)}

					{successMessage && (
						<div
							className="rounded-md border border-green-200 bg-green-50 p-2 text-xs text-green-700"
							role="status"
						>
							{successMessage}
						</div>
					)}

					{/* Full Name */}
					<div className="space-y-1">
						<Label htmlFor="fullName" className="text-xs font-medium text-gray-700">
							Nom Complet
						</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="fullName"
								type="text"
								placeholder="Votre nom complet"
								value={fullName}
								onChange={(event) => setFullName(event.target.value)}
								required
								disabled={isSubmitting}
								className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Email */}
					<div className="space-y-1">
						<Label htmlFor="email" className="text-xs font-medium text-gray-700">
							Email
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="email"
								type="email"
								placeholder="votre@email.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								disabled={isSubmitting}
								className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Country */}
					<div className="space-y-1">
						<Label htmlFor="country" className="text-xs font-medium text-gray-700">
							Pays
						</Label>
						<div className="relative">
							<Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="country"
								type="text"
								placeholder="Votre pays"
								value={country}
								onChange={(event) => setCountry(event.target.value)}
								required
								disabled={isSubmitting}
								className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
						</div>
					</div>

					{/* Company Name (for sellers) */}
					{isSeller && (
						<div className="space-y-1">
							<Label htmlFor="company" className="text-xs font-medium text-gray-700">
								Nom de l'Entreprise
							</Label>
							<div className="relative">
								<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<Input
									id="company"
									type="text"
									placeholder="Nom de votre entreprise"
									value={company}
									onChange={(event) => setCompany(event.target.value)}
									required
									disabled={isSubmitting}
									className="h-10 pl-9 pr-3 text-sm border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
								/>
							</div>
						</div>
					)}

					{/* Password */}
					<div className="space-y-1">
						<Label htmlFor="password" className="text-xs font-medium text-gray-700">
							Mot de Passe
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Minimum 8 caractères"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								disabled={isSubmitting}
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
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
								required
								disabled={isSubmitting}
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
							checked={termsAccepted}
							onChange={(event) => setTermsAccepted(event.target.checked)}
							required
							disabled={isSubmitting}
							className="mt-0.5 w-3.5 h-3.5 text-brand-green border-gray-300 rounded focus:ring-brand-green"
						/>
						<label htmlFor="terms" className="text-[11px] text-gray-600 leading-tight">
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
						disabled={isSubmitting}
						className="w-full h-10 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all mt-1"
					>
						{isSubmitting ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								Création...
							</span>
						) : (
							"Créer mon Compte"
						)}
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
