"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getApiErrorMessage } from "@/lib/api";
import { verifyEmail } from "@/lib/auth";

type VerifyStatus = "idle" | "loading" | "success" | "error";

function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [status, setStatus] = useState<VerifyStatus>(() =>
		token ? "loading" : "error",
	);
	const [message, setMessage] = useState(() =>
		token
			? "Vérification de votre email en cours..."
			: "Token de vérification manquant.",
	);

	useEffect(() => {
		const verificationToken = token;
		if (typeof verificationToken !== "string" || verificationToken.length === 0) {
			return;
		}
		const tokenValue = verificationToken;

		let isMounted = true;

		async function runVerification() {
			try {
				await verifyEmail(tokenValue);
				if (!isMounted) {
					return;
				}
				setStatus("success");
				setMessage("Email vérifié avec succès. Vous pouvez vous connecter.");
			} catch (error) {
				if (!isMounted) {
					return;
				}
				setStatus("error");
				setMessage(getApiErrorMessage(error, "Le lien est invalide ou expiré."));
			}
		}

		void runVerification();

		return () => {
			isMounted = false;
		};
	}, [token]);

	const colorClass =
		status === "success"
			? "border-green-200 bg-green-50 text-green-700"
			: status === "error"
				? "border-red-200 bg-red-50 text-red-700"
				: "border-blue-200 bg-blue-50 text-blue-700";

	return (
		<div className={`rounded-md border p-3 text-sm ${colorClass}`}>{message}</div>
	);
}

export default function VerifyEmailPage() {
	return (
		<div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
			<div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
				<h1 className="text-2xl font-bold text-brand-green mb-3">
					Vérification Email
				</h1>
				<Suspense
					fallback={
						<div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
							Vérification de votre email en cours...
						</div>
					}
				>
					<VerifyEmailContent />
				</Suspense>

				<div className="mt-6 flex gap-3">
					<Link
						href="/login"
						className="inline-flex h-10 items-center rounded-md bg-brand-green px-4 text-sm font-semibold text-white hover:bg-brand-green-dark"
					>
						Aller à la connexion
					</Link>
					<Link
						href="/register"
						className="inline-flex h-10 items-center rounded-md border border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
					>
						Créer un compte
					</Link>
				</div>
			</div>
		</div>
	);
}
