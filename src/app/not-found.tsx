import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full text-center">
				<div className="mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
						<AlertCircle className="w-10 h-10 text-red-600" />
					</div>
					<h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
					<h2 className="text-2xl font-semibold text-gray-700 mb-3">
						Page non trouvée
					</h2>
					<p className="text-gray-500 mb-8">
						La page que vous recherchez n'existe pas ou vous n'avez pas l'autorisation d'y accéder.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Link href="/">
						<Button
							variant="outline"
							className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour
						</Button>
					</Link>
					<Link href="/login">
						<Button className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-dark text-white">
							<Home className="w-4 h-4 mr-2" />
							Accueil
						</Button>
					</Link>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-200">
					<img
						src="/logo/agrobridge-01.svg"
						alt="Agrobridge"
						className="h-8 mx-auto opacity-50"
					/>
				</div>
			</div>
		</div>
	);
}
