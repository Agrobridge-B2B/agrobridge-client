"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/lib/upload";
import { updateProfile, uploadProfileImage, changePassword } from "@/lib/user";
import { getApiErrorMessage } from "@/lib/api";
import {
	Camera,
	Loader2,
	Check,
	Eye,
	EyeOff,
	User,
	Mail,
	MapPin,
	Lock,
} from "lucide-react";

export function ProfileSettings() {
	const { user, refreshUser } = useAuth();

	// ── Profile Image ────────────────────────────────
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadingImage, setUploadingImage] = useState(false);
	const [imageError, setImageError] = useState("");
	const [imageSuccess, setImageSuccess] = useState("");

	async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 2 * 1024 * 1024) {
			setImageError("La taille maximale est de 2 Mo");
			return;
		}

		setUploadingImage(true);
		setImageError("");
		setImageSuccess("");
		try {
			await uploadProfileImage(file);
			await refreshUser();
			setImageSuccess("Photo mise à jour !");
			setTimeout(() => setImageSuccess(""), 3000);
		} catch (err) {
			setImageError(getApiErrorMessage(err));
		} finally {
			setUploadingImage(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}

	// ── Country ──────────────────────────────────────
	const [country, setCountry] = useState(user?.country ?? "");
	const [savingCountry, setSavingCountry] = useState(false);
	const [countryError, setCountryError] = useState("");
	const [countrySuccess, setCountrySuccess] = useState("");

	async function handleCountrySave() {
		if (country.trim().length < 2) {
			setCountryError("Le pays doit contenir au moins 2 caractères");
			return;
		}
		setSavingCountry(true);
		setCountryError("");
		setCountrySuccess("");
		try {
			await updateProfile({ country: country.trim() });
			await refreshUser();
			setCountrySuccess("Pays mis à jour !");
			setTimeout(() => setCountrySuccess(""), 3000);
		} catch (err) {
			setCountryError(getApiErrorMessage(err));
		} finally {
			setSavingCountry(false);
		}
	}

	// ── Password ─────────────────────────────────────
	const [currentPwd, setCurrentPwd] = useState("");
	const [newPwd, setNewPwd] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");
	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [savingPwd, setSavingPwd] = useState(false);
	const [pwdError, setPwdError] = useState("");
	const [pwdSuccess, setPwdSuccess] = useState("");

	async function handlePasswordSave() {
		setPwdError("");
		setPwdSuccess("");

		if (!currentPwd || !newPwd || !confirmPwd) {
			setPwdError("Veuillez remplir tous les champs");
			return;
		}
		if (newPwd !== confirmPwd) {
			setPwdError("Les mots de passe ne correspondent pas");
			return;
		}
		if (newPwd.length < 8) {
			setPwdError("Le mot de passe doit contenir au moins 8 caractères");
			return;
		}

		setSavingPwd(true);
		try {
			await changePassword(currentPwd, newPwd);
			setPwdSuccess("Mot de passe changé avec succès !");
			setCurrentPwd("");
			setNewPwd("");
			setConfirmPwd("");
			setTimeout(() => setPwdSuccess(""), 3000);
		} catch (err) {
			setPwdError(getApiErrorMessage(err));
		} finally {
			setSavingPwd(false);
		}
	}

	const profileImageUrl = (user as any)?.profileImage
		? getImageUrl((user as any).profileImage)
		: null;

	return (
		<div className="space-y-8">
			{/* ── Profile Image ────────────────────── */}
			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Photo de profil</h2>
				<div className="flex items-center gap-6">
					<div className="relative">
						<div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden flex items-center justify-center">
							{profileImageUrl ? (
								<Image
									src={profileImageUrl}
									alt="Profile"
									width={96}
									height={96}
									className="w-full h-full object-cover"
									unoptimized
								/>
							) : (
								<User className="w-10 h-10 text-gray-400" />
							)}
						</div>
						<button
							onClick={() => fileInputRef.current?.click()}
							disabled={uploadingImage}
							className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green/90 transition-colors shadow-sm disabled:opacity-50"
						>
							{uploadingImage ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Camera className="w-4 h-4" />
							)}
						</button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/png,image/webp"
							onChange={handleImageUpload}
							className="hidden"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-600">
							Formats acceptés : JPG, PNG, WEBP
						</p>
						<p className="text-xs text-gray-400 mt-1">Taille maximale : 2 Mo</p>
						{imageError && (
							<p className="text-xs text-red-600 mt-1">{imageError}</p>
						)}
						{imageSuccess && (
							<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
								<Check className="w-3 h-3" /> {imageSuccess}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* ── Account Info (read-only) ─────────── */}
			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">
					Informations du compte
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Name — read-only */}
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Nom complet
						</label>
						<div className="flex items-center gap-2 h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg">
							<User className="w-4 h-4 text-gray-400" />
							<span className="text-sm text-gray-500">{user?.fullName}</span>
						</div>
						<p className="text-xs text-gray-400 mt-1">
							Le nom ne peut pas être modifié
						</p>
					</div>

					{/* Email — read-only */}
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Email
						</label>
						<div className="flex items-center gap-2 h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg">
							<Mail className="w-4 h-4 text-gray-400" />
							<span className="text-sm text-gray-500">{user?.email}</span>
						</div>
						<p className="text-xs text-gray-400 mt-1">
							L&apos;email ne peut pas être modifié
						</p>
					</div>

					{/* Country — editable */}
					<div className="md:col-span-2">
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Pays
						</label>
						<div className="flex items-center gap-3">
							<div className="relative flex-1 max-w-sm">
								<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									className="w-full h-10 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								/>
							</div>
							<button
								onClick={handleCountrySave}
								disabled={savingCountry || country.trim() === user?.country}
								className="h-10 px-4 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								{savingCountry ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									"Enregistrer"
								)}
							</button>
						</div>
						{countryError && (
							<p className="text-xs text-red-600 mt-1">{countryError}</p>
						)}
						{countrySuccess && (
							<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
								<Check className="w-3 h-3" /> {countrySuccess}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* ── Change Password ──────────────────── */}
			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">
					Changer le mot de passe
				</h2>

				<div className="space-y-4 max-w-md">
					{/* Current password */}
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Mot de passe actuel
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type={showCurrent ? "text" : "password"}
								value={currentPwd}
								onChange={(e) => setCurrentPwd(e.target.value)}
								className="w-full h-10 pl-9 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={() => setShowCurrent(!showCurrent)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showCurrent ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					{/* New password */}
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Nouveau mot de passe
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type={showNew ? "text" : "password"}
								value={newPwd}
								onChange={(e) => setNewPwd(e.target.value)}
								className="w-full h-10 pl-9 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={() => setShowNew(!showNew)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showNew ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
						<p className="text-xs text-gray-400 mt-1">
							Min. 8 caractères, majuscule, minuscule, chiffre, caractère spécial
						</p>
					</div>

					{/* Confirm password */}
					<div>
						<label className="text-sm font-medium text-gray-600 mb-1.5 block">
							Confirmer le nouveau mot de passe
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="password"
								value={confirmPwd}
								onChange={(e) => setConfirmPwd(e.target.value)}
								className="w-full h-10 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
								placeholder="••••••••"
							/>
						</div>
					</div>

					{pwdError && (
						<p className="text-sm text-red-600">{pwdError}</p>
					)}
					{pwdSuccess && (
						<p className="text-sm text-green-600 flex items-center gap-1">
							<Check className="w-4 h-4" /> {pwdSuccess}
						</p>
					)}

					<button
						onClick={handlePasswordSave}
						disabled={savingPwd || !currentPwd || !newPwd || !confirmPwd}
						className="h-10 px-6 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{savingPwd ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Enregistrement...
							</>
						) : (
							"Changer le mot de passe"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
