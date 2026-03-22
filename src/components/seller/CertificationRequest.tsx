"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/lib/upload";
import {
	getCertificationStatus,
	submitCertification,
	type CertificationInfo,
} from "@/lib/user";
import { getApiErrorMessage } from "@/lib/api";
import {
	Shield,
	ShieldCheck,
	ShieldX,
	Clock,
	Upload,
	FileText,
	Loader2,
	Check,
	AlertCircle,
	ExternalLink,
} from "lucide-react";

function StatusBadge({ status }: { status: CertificationInfo["certificationStatus"] }) {
	switch (status) {
		case "approved":
			return (
				<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
					<ShieldCheck className="w-3.5 h-3.5" />
					Certifié
				</span>
			);
		case "pending":
			return (
				<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
					<Clock className="w-3.5 h-3.5" />
					En attente de vérification
				</span>
			);
		case "rejected":
			return (
				<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
					<ShieldX className="w-3.5 h-3.5" />
					Rejeté
				</span>
			);
		default:
			return (
				<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
					<Shield className="w-3.5 h-3.5" />
					Non certifié
				</span>
			);
	}
}

function formatDate(dateStr?: string) {
	if (!dateStr) return "—";
	return new Date(dateStr).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export function CertificationRequest() {
	const { refreshUser } = useAuth();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [info, setInfo] = useState<CertificationInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	useEffect(() => {
		loadStatus();
	}, []);

	async function loadStatus() {
		try {
			setLoading(true);
			const data = await getCertificationStatus();
			setInfo(data);
		} catch (err) {
			setError(getApiErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit() {
		if (!selectedFile) {
			setError("Veuillez sélectionner un document");
			return;
		}

		if (selectedFile.size > 10 * 1024 * 1024) {
			setError("La taille maximale est de 10 Mo");
			return;
		}

		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			await submitCertification(selectedFile);
			await refreshUser();
			await loadStatus();
			setSelectedFile(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
			setSuccess("Demande de certification soumise avec succès !");
			setTimeout(() => setSuccess(""), 5000);
		} catch (err) {
			setError(getApiErrorMessage(err));
		} finally {
			setSubmitting(false);
		}
	}

	if (loading) {
		return (
			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<div className="flex items-center justify-center py-8">
					<Loader2 className="w-6 h-6 animate-spin text-brand-green" />
				</div>
			</div>
		);
	}

	const status = info?.certificationStatus ?? "none";
	const canSubmit = status === "none" || status === "rejected";

	return (
		<div className="space-y-6">
			{/* Status Card */}
			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Certification vendeur
					</h2>
					<StatusBadge status={status} />
				</div>

				{/* Status Timeline */}
				<div className="space-y-4">
					{status === "approved" && (
						<div className="bg-green-50 border border-green-200 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-green-800">
										Votre compte est certifié
									</p>
									<p className="text-xs text-green-600 mt-1">
										Vos produits bénéficient d&apos;une priorité d&apos;affichage
										et du badge &quot;Vérifié&quot; sur le marketplace.
									</p>
									{info?.certificationReviewDate && (
										<p className="text-xs text-green-500 mt-2">
											Approuvé le {formatDate(info.certificationReviewDate)}
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					{status === "pending" && (
						<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-yellow-800">
										Demande en cours de vérification
									</p>
									<p className="text-xs text-yellow-600 mt-1">
										Notre équipe examine votre document. Vous serez notifié
										une fois la vérification terminée.
									</p>
									{info?.certificationRequestDate && (
										<p className="text-xs text-yellow-500 mt-2">
											Soumis le {formatDate(info.certificationRequestDate)}
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					{status === "rejected" && (
						<div className="bg-red-50 border border-red-200 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<ShieldX className="w-5 h-5 text-red-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-red-800">
										Demande de certification rejetée
									</p>
									<p className="text-xs text-red-600 mt-1">
										Votre document n&apos;a pas été accepté. Vous pouvez
										soumettre un nouveau document ci-dessous.
									</p>
									{info?.certificationReviewDate && (
										<p className="text-xs text-red-500 mt-2">
											Rejeté le {formatDate(info.certificationReviewDate)}
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					{status === "none" && (
						<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-blue-800">
										Obtenez votre certification vendeur
									</p>
									<p className="text-xs text-blue-600 mt-1">
										La certification vous permet d&apos;afficher le badge
										&quot;Vérifié&quot; et d&apos;obtenir une priorité
										d&apos;affichage pour vos produits.
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Existing document link */}
					{info?.certificationDocument && status !== "none" && (
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<FileText className="w-4 h-4" />
							<a
								href={getImageUrl(info.certificationDocument)}
								target="_blank"
								rel="noopener noreferrer"
								className="text-brand-green hover:underline inline-flex items-center gap-1"
							>
								Voir le document soumis
								<ExternalLink className="w-3 h-3" />
							</a>
						</div>
					)}
				</div>
			</div>

			{/* Upload Form — only show if can submit */}
			{canSubmit && (
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<h3 className="text-base font-semibold text-gray-900 mb-4">
						{status === "rejected"
							? "Soumettre un nouveau document"
							: "Soumettre votre document de certification"}
					</h3>

					<p className="text-sm text-gray-500 mb-4">
						Fournissez un document officiel attestant votre activité agricole
						(certificat d&apos;exploitation, licence commerciale, certificat bio, etc.)
					</p>

					<div className="space-y-4">
						{/* File Selector */}
						<div
							onClick={() => fileInputRef.current?.click()}
							className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-brand-green/50 hover:bg-gray-50 transition-colors"
						>
							{selectedFile ? (
								<div className="flex items-center justify-center gap-3">
									<FileText className="w-8 h-8 text-brand-green" />
									<div className="text-left">
										<p className="text-sm font-medium text-gray-900">
											{selectedFile.name}
										</p>
										<p className="text-xs text-gray-500">
											{(selectedFile.size / 1024 / 1024).toFixed(2)} Mo
										</p>
									</div>
								</div>
							) : (
								<>
									<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
									<p className="text-sm text-gray-600">
										Cliquez pour sélectionner un fichier
									</p>
									<p className="text-xs text-gray-400 mt-1">
										PDF, JPG, PNG ou WEBP — max 10 Mo
									</p>
								</>
							)}
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="application/pdf,image/jpeg,image/png,image/webp"
							onChange={(e) => {
								setSelectedFile(e.target.files?.[0] ?? null);
								setError("");
							}}
							className="hidden"
						/>

						{error && (
							<p className="text-sm text-red-600">{error}</p>
						)}
						{success && (
							<p className="text-sm text-green-600 flex items-center gap-1">
								<Check className="w-4 h-4" /> {success}
							</p>
						)}

						<button
							onClick={handleSubmit}
							disabled={!selectedFile || submitting}
							className="h-10 px-6 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
						>
							{submitting ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Envoi en cours...
								</>
							) : (
								<>
									<Upload className="w-4 h-4" />
									Soumettre la demande
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
