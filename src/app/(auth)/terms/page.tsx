export default function TermsPage() {
	return (
		<div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-brand-dark mb-4">
						Conditions d'Utilisation
					</h1>
					<p className="text-gray-600">
						Dernière mise à jour : Mars 2026
					</p>
				</div>

				{/* Content */}
				<div className="prose prose-lg max-w-none space-y-8">
					{/* Introduction */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							1. Introduction
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Bienvenue sur Agrobridge, la plateforme B2B de commerce agricole mondiale. 
							En accédant et en utilisant notre plateforme, vous acceptez d'être lié par 
							les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, 
							veuillez ne pas utiliser nos services.
						</p>
					</section>

					{/* Services */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							2. Description des Services
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Agrobridge fournit une plateforme de marketplace B2B qui connecte les 
							agriculteurs locaux et les acheteurs mondiaux pour faciliter le commerce 
							de produits agricoles. Nos services incluent :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Mise en relation entre vendeurs et acheteurs de produits agricoles</li>
							<li>Gestion des transactions commerciales B2B</li>
							<li>Vérification et certification des utilisateurs</li>
							<li>Suivi logistique et support documentaire</li>
							<li>Outils de communication sécurisés</li>
						</ul>
					</section>

					{/* Eligibility */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							3. Éligibilité
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Pour utiliser Agrobridge, vous devez :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Avoir au moins 18 ans ou l'âge légal dans votre juridiction</li>
							<li>Représenter une entreprise légalement enregistrée</li>
							<li>Fournir des informations exactes et à jour lors de l'inscription</li>
							<li>Respecter toutes les lois et réglementations applicables</li>
						</ul>
					</section>

					{/* User Obligations */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							4. Obligations des Utilisateurs
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							En tant qu'utilisateur de la plateforme, vous vous engagez à :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Maintenir la confidentialité de vos identifiants de compte</li>
							<li>Fournir des informations véridiques sur vos produits et services</li>
							<li>Respecter les normes de qualité et de sécurité alimentaire</li>
							<li>Honorer vos engagements commerciaux</li>
							<li>Ne pas utiliser la plateforme à des fins frauduleuses ou illégales</li>
							<li>Respecter les droits de propriété intellectuelle</li>
						</ul>
					</section>

					{/* Transactions */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							5. Transactions et Paiements
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Toutes les transactions effectuées via Agrobridge sont soumises aux 
							conditions suivantes :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Les prix sont fixés par les vendeurs et négociables entre les parties</li>
							<li>Agrobridge peut prélever des frais de service sur les transactions</li>
							<li>Les paiements sont traités via des méthodes sécurisées</li>
							<li>Les litiges doivent être résolus conformément à nos procédures</li>
						</ul>
					</section>

					{/* Quality Standards */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							6. Normes de Qualité et Sécurité
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Tous les produits agricoles commercialisés sur Agrobridge doivent respecter :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Les normes internationales de sécurité alimentaire</li>
							<li>Les réglementations locales et internationales applicables</li>
							<li>Les certifications requises pour l'exportation/importation</li>
							<li>Les standards de traçabilité et de documentation</li>
						</ul>
					</section>

					{/* Intellectual Property */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							7. Propriété Intellectuelle
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Tous les contenus, logos, marques et technologies d'Agrobridge sont protégés 
							par les lois sur la propriété intellectuelle. Vous ne pouvez pas copier, 
							modifier ou distribuer notre contenu sans autorisation écrite préalable.
						</p>
					</section>

					{/* Limitation of Liability */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							8. Limitation de Responsabilité
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Agrobridge agit en tant qu'intermédiaire et ne peut être tenu responsable :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>De la qualité, de la sécurité ou de la légalité des produits</li>
							<li>Des actions ou omissions des vendeurs ou acheteurs</li>
							<li>Des pertes financières résultant de transactions</li>
							<li>Des interruptions de service ou erreurs techniques</li>
						</ul>
					</section>

					{/* Termination */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							9. Résiliation
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Nous nous réservons le droit de suspendre ou de résilier votre compte en 
							cas de violation des présentes conditions, d'activité frauduleuse ou pour 
							toute autre raison jugée nécessaire pour protéger l'intégrité de la plateforme.
						</p>
					</section>

					{/* Modifications */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							10. Modifications des Conditions
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Agrobridge se réserve le droit de modifier ces conditions à tout moment. 
							Les utilisateurs seront informés des modifications importantes par email 
							ou via la plateforme. L'utilisation continue de nos services après les 
							modifications constitue votre acceptation des nouvelles conditions.
						</p>
					</section>

					{/* Governing Law */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							11. Droit Applicable
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Ces conditions sont régies par les lois internationales du commerce et 
							les réglementations applicables au commerce agricole. Tout litige sera 
							résolu par arbitrage ou médiation avant toute action en justice.
						</p>
					</section>

					{/* Contact */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							12. Contact
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Pour toute question concernant ces conditions d'utilisation, veuillez nous 
							contacter à :
						</p>
						<div className="mt-4 p-4 bg-brand-light rounded-lg">
							<p className="text-gray-700">
								<strong>Email :</strong> legal@agrobridge.com<br />
								<strong>Téléphone :</strong> +212 XXX XXX XXX<br />
								<strong>Adresse :</strong> Agrobridge, Maroc
							</p>
						</div>
					</section>
				</div>

				{/* Back Link */}
				<div className="mt-12 text-center">
					<a
						href="/register"
						className="text-brand-green hover:underline font-semibold"
					>
						← Retour à l'inscription
					</a>
				</div>
			</div>
		</div>
	);
}
