"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { authService } from "@/lib/auth";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSent, setIsSent] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await authService.forgotPassword(email);
			setIsSent(true);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to send reset email");
		}
		setIsLoading(false);
	};

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
					{isSent ? (
						<div className="flex flex-col items-center gap-6 text-center">
							<Link href="/">
								<img
									src="/logo/agrobridge-01.svg"
									alt="Agrobridge Logo"
									className="w-32 h-auto"
								/>
							</Link>
							<CheckCircle className="w-16 h-16 text-brand-green" />
							<div>
								<h1 className="text-2xl font-bold text-brand-green mb-2">
									Email envoyé !
								</h1>
								<p className="text-sm text-gray-600">
									Si un compte existe avec cette adresse email, vous recevrez un
									lien de réinitialisation. Vérifiez votre boîte de réception.
								</p>
							</div>
							<Link
								href="/login"
								className="text-brand-green font-semibold hover:underline flex items-center gap-2"
							>
								<ArrowLeft className="w-4 h-4" />
								Retour à la connexion
							</Link>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-6">
								<Link href="/">
									<img
										src="/logo/agrobridge-01.svg"
										alt="Agrobridge Logo"
										className="w-32 h-auto"
									/>
								</Link>
								<div className="text-center">
									<h1 className="text-2xl lg:text-3xl font-bold text-brand-green mb-2">
										Mot de passe oublié
									</h1>
									<p className="text-sm text-gray-600">
										Entrez votre email pour recevoir un lien de réinitialisation
									</p>
								</div>

								<div className="w-full space-y-5 mt-4">
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
												Envoi en cours...
											</span>
										) : (
											"Envoyer le lien"
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
					)}
				</div>
			</div>
		</div>
	);
}
