"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, Suspense } from "react";
import { Lock, Loader2, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { authService } from "@/lib/auth";

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";
	const router = useRouter();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas");
			return;
		}

		if (!token) {
			setError("Token de réinitialisation manquant");
			return;
		}

		setIsLoading(true);
		try {
			await authService.resetPassword(token, password);
			setIsSuccess(true);
		} catch (err: any) {
			setError(err.response?.data?.message || "Password reset failed");
		}
		setIsLoading(false);
	};

	if (!token) {
		return (
			<div className="flex flex-col items-center gap-6 text-center">
				<Link href="/">
					<img src="/logo/agrobridge-01.svg" alt="Agrobridge Logo" className="w-32 h-auto" />
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-red-600 mb-2">Lien invalide</h1>
					<p className="text-sm text-gray-600">
						Le lien de réinitialisation est invalide ou a expiré.
					</p>
				</div>
				<Link href="/forgot-password" className="text-brand-green font-semibold hover:underline">
					Demander un nouveau lien
				</Link>
			</div>
		);
	}

	return isSuccess ? (
		<div className="flex flex-col items-center gap-6 text-center">
			<Link href="/">
				<img src="/logo/agrobridge-01.svg" alt="Agrobridge Logo" className="w-32 h-auto" />
			</Link>
			<CheckCircle className="w-16 h-16 text-brand-green" />
			<div>
				<h1 className="text-2xl font-bold text-brand-green mb-2">
					Mot de passe réinitialisé !
				</h1>
				<p className="text-sm text-gray-600">
					Votre mot de passe a été modifié avec succès.
				</p>
			</div>
			<Button
				onClick={() => router.push("/login")}
				className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-8 py-3"
			>
				Se connecter
			</Button>
		</div>
	) : (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-6">
				<Link href="/">
					<img src="/logo/agrobridge-01.svg" alt="Agrobridge Logo" className="w-32 h-auto" />
				</Link>
				<div className="text-center">
					<h1 className="text-2xl lg:text-3xl font-bold text-brand-green mb-2">
						Nouveau mot de passe
					</h1>
					<p className="text-sm text-gray-600">
						Choisissez un nouveau mot de passe sécurisé
					</p>
				</div>

				<div className="w-full space-y-5 mt-4">
					<div className="space-y-2">
						<Label htmlFor="password" className="text-sm font-medium text-gray-700">
							Nouveau mot de passe
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Minimum 8 caractères"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								className="h-12 pl-10 pr-12 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
						<p className="text-xs text-gray-500">
							Majuscule, minuscule, chiffre et caractère spécial requis
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
							Confirmer le mot de passe
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								id="confirmPassword"
								type={showConfirm ? "text" : "password"}
								placeholder="Confirmez votre mot de passe"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={isLoading}
								className="h-12 pl-10 pr-12 border-2 border-gray-200 rounded-lg focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowConfirm(!showConfirm)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
					</div>

					{error && (
						<div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
							{error}
						</div>
					)}

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-60"
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2">
								<Loader2 className="w-5 h-5 animate-spin" />
								Réinitialisation...
							</span>
						) : (
							"Réinitialiser le mot de passe"
						)}
					</Button>

					<div className="text-center">
						<Link
							href="/login"
							className="text-sm text-brand-green font-semibold hover:underline flex items-center justify-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour à la connexion
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}

export default function ResetPasswordPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<div className="relative hidden lg:block">
				<img
					src="./images/agri-bg.jpg"
					alt="Agriculture background"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/10" />
			</div>
			<div className="flex items-center justify-center p-6 bg-white">
				<div className="w-full max-w-md">
					<Suspense fallback={<div className="text-center text-gray-500">Chargement...</div>}>
						<ResetPasswordContent />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
