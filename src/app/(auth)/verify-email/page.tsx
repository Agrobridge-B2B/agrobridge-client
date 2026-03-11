"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/auth";

function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";

	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setMessage("Token de vérification manquant");
			return;
		}

		const verify = async () => {
			try {
				const res = await authService.verifyEmail(token);
				setStatus("success");
				setMessage(res.message);
			} catch (err: any) {
				setStatus("error");
				setMessage(err.response?.data?.message || "Verification failed");
			}
		};

		verify();
	}, [token]);

	return (
		<div className="flex flex-col items-center gap-6 text-center">
			<Link href="/">
				<img
					src="/logo/agrobridge-01.svg"
					alt="Agrobridge Logo"
					className="w-32 h-auto"
				/>
			</Link>

			{status === "loading" && (
				<>
					<Loader2 className="w-16 h-16 text-brand-green animate-spin" />
					<h1 className="text-2xl font-bold text-gray-700">
						Vérification en cours...
					</h1>
				</>
			)}

			{status === "success" && (
				<>
					<CheckCircle className="w-16 h-16 text-brand-green" />
					<div>
						<h1 className="text-2xl font-bold text-brand-green mb-2">
							Email vérifié !
						</h1>
						<p className="text-sm text-gray-600">{message}</p>
					</div>
					<Link href="/login">
						<Button className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-8 py-3">
							Se connecter
						</Button>
					</Link>
				</>
			)}

			{status === "error" && (
				<>
					<XCircle className="w-16 h-16 text-red-500" />
					<div>
						<h1 className="text-2xl font-bold text-red-600 mb-2">
							Erreur de vérification
						</h1>
						<p className="text-sm text-gray-600">{message}</p>
					</div>
					<div className="flex flex-col gap-3">
						<Link href="/login">
							<Button
								variant="outline"
								className="border-brand-green text-brand-green hover:bg-brand-green/10 font-semibold px-8 py-3"
							>
								Retour à la connexion
							</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default function VerifyEmailPage() {
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
					<Suspense
						fallback={
							<div className="flex flex-col items-center gap-4">
								<Loader2 className="w-10 h-10 text-brand-green animate-spin" />
								<p className="text-gray-500">Chargement...</p>
							</div>
						}
					>
						<VerifyEmailContent />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
