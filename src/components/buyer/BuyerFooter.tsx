import Link from "next/link";
import Image from "next/image";
import { Mail, Globe } from "lucide-react";

export function BuyerFooter() {
	return (
		<footer className="bg-gray-50 border-t border-gray-200 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div>
						<div className="flex items-center gap-2 mb-3">
							<Image
								src="/logo/agrobridge-01.svg"
								alt="Agrobridge"
								width={32}
								height={32}
							/>
							<span className="font-bold text-gray-900">Agrobridge</span>
						</div>
						<p className="text-sm text-gray-500 leading-relaxed">
							Connecter les producteurs agricoles africains avec les acheteurs internationaux.
						</p>
					</div>

					{/* À propos */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-3 text-sm">À propos</h3>
						<ul className="space-y-2">
							<li>
								<Link href="#" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Notre mission
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Comment ça marche
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Devenir vendeur
								</Link>
							</li>
						</ul>
					</div>

					{/* Ressources */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-3 text-sm">Ressources</h3>
						<ul className="space-y-2">
							<li>
								<Link href="#" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Centre d&apos;aide
								</Link>
							</li>
							<li>
								<Link href="/terms" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Conditions d&apos;utilisation
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
									Politique de confidentialité
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-3 text-sm">Contact</h3>
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<Mail className="w-4 h-4 text-gray-400" />
								<span className="text-sm text-gray-500">agrobridge2025@gmail.com</span>
							</li>
							<li className="flex items-center gap-2">
								<Globe className="w-4 h-4 text-gray-400" />
								<span className="text-sm text-gray-500">www.agrobridge.farm</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="border-t border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<p className="text-center text-xs text-gray-400">
						© {new Date().getFullYear()} Agrobridge. Tous droits réservés.
					</p>
				</div>
			</div>
		</footer>
	);
}
