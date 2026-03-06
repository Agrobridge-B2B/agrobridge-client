export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-brand-dark mb-4">
						Politique de Confidentialité
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
							Chez Agrobridge, nous prenons très au sérieux la protection de vos données 
							personnelles. Cette politique de confidentialité explique comment nous 
							collectons, utilisons, partageons et protégeons vos informations lorsque 
							vous utilisez notre plateforme de commerce agricole B2B.
						</p>
					</section>

					{/* Data Collection */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							2. Données Collectées
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nous collectons les types de données suivants :
						</p>
						
						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							2.1 Informations d'Inscription
						</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Nom complet et informations de contact</li>
							<li>Adresse email professionnelle</li>
							<li>Numéro de téléphone</li>
							<li>Nom de l'entreprise et informations légales</li>
							<li>Type de compte (acheteur ou vendeur)</li>
						</ul>

						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							2.2 Données de Transaction
						</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Historique des commandes et transactions</li>
							<li>Informations de paiement (traitées de manière sécurisée)</li>
							<li>Détails des produits achetés ou vendus</li>
							<li>Communications entre acheteurs et vendeurs</li>
						</ul>

						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							2.3 Données Techniques
						</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Adresse IP et données de localisation</li>
							<li>Type de navigateur et appareil utilisé</li>
							<li>Cookies et technologies similaires</li>
							<li>Données d'utilisation de la plateforme</li>
						</ul>
					</section>

					{/* Data Usage */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							3. Utilisation des Données
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nous utilisons vos données pour :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Créer et gérer votre compte utilisateur</li>
							<li>Faciliter les transactions entre acheteurs et vendeurs</li>
							<li>Vérifier votre identité et prévenir la fraude</li>
							<li>Améliorer nos services et l'expérience utilisateur</li>
							<li>Vous envoyer des notifications importantes sur la plateforme</li>
							<li>Respecter nos obligations légales et réglementaires</li>
							<li>Analyser les tendances du marché agricole</li>
							<li>Fournir un support client personnalisé</li>
						</ul>
					</section>

					{/* Data Sharing */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							4. Partage des Données
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nous pouvons partager vos données dans les cas suivants :
						</p>
						
						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							4.1 Avec d'Autres Utilisateurs
						</h3>
						<p className="text-gray-700 leading-relaxed ml-4">
							Les informations professionnelles de base (nom d'entreprise, produits, 
							évaluations) sont visibles par les autres utilisateurs pour faciliter 
							les transactions commerciales.
						</p>

						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							4.2 Avec des Partenaires de Service
						</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Processeurs de paiement sécurisés</li>
							<li>Services de logistique et d'expédition</li>
							<li>Fournisseurs de services cloud et d'hébergement</li>
							<li>Services d'analyse et de marketing</li>
						</ul>

						<h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">
							4.3 Pour des Raisons Légales
						</h3>
						<p className="text-gray-700 leading-relaxed ml-4">
							Nous pouvons divulguer vos données si requis par la loi, pour protéger 
							nos droits légaux, ou pour prévenir des activités frauduleuses.
						</p>
					</section>

					{/* Data Security */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							5. Sécurité des Données
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nous mettons en œuvre des mesures de sécurité robustes pour protéger 
							vos données :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Chiffrement SSL/TLS pour toutes les communications</li>
							<li>Authentification à deux facteurs disponible</li>
							<li>Stockage sécurisé des données avec chiffrement</li>
							<li>Audits de sécurité réguliers</li>
							<li>Contrôles d'accès stricts aux données personnelles</li>
							<li>Surveillance continue des menaces de sécurité</li>
						</ul>
					</section>

					{/* Data Retention */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							6. Conservation des Données
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Nous conservons vos données personnelles aussi longtemps que nécessaire 
							pour fournir nos services et respecter nos obligations légales. Les données 
							de transaction sont conservées conformément aux exigences comptables et 
							fiscales. Vous pouvez demander la suppression de votre compte à tout moment, 
							sous réserve de nos obligations légales de conservation.
						</p>
					</section>

					{/* User Rights */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							7. Vos Droits
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Conformément aux réglementations sur la protection des données, vous avez 
							le droit de :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li><strong>Accès :</strong> Demander une copie de vos données personnelles</li>
							<li><strong>Rectification :</strong> Corriger les données inexactes ou incomplètes</li>
							<li><strong>Suppression :</strong> Demander la suppression de vos données</li>
							<li><strong>Portabilité :</strong> Recevoir vos données dans un format structuré</li>
							<li><strong>Opposition :</strong> Vous opposer au traitement de vos données</li>
							<li><strong>Limitation :</strong> Demander la limitation du traitement</li>
						</ul>
						<p className="text-gray-700 leading-relaxed mt-4">
							Pour exercer ces droits, contactez-nous à privacy@agrobridge.com
						</p>
					</section>

					{/* Cookies */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							8. Cookies et Technologies Similaires
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nous utilisons des cookies pour :
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Maintenir votre session connectée</li>
							<li>Mémoriser vos préférences</li>
							<li>Analyser l'utilisation de la plateforme</li>
							<li>Personnaliser votre expérience</li>
						</ul>
						<p className="text-gray-700 leading-relaxed mt-4">
							Vous pouvez gérer vos préférences de cookies dans les paramètres de votre 
							navigateur.
						</p>
					</section>

					{/* International Transfers */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							9. Transferts Internationaux
						</h2>
						<p className="text-gray-700 leading-relaxed">
							En tant que plateforme mondiale, vos données peuvent être transférées et 
							traitées dans différents pays. Nous nous assurons que tous les transferts 
							respectent les normes de protection des données et utilisent des mécanismes 
							de protection appropriés comme les clauses contractuelles types.
						</p>
					</section>

					{/* Children's Privacy */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							10. Protection des Mineurs
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Agrobridge est une plateforme B2B destinée aux professionnels. Nous ne 
							collectons pas sciemment de données auprès de personnes de moins de 18 ans. 
							Si nous découvrons qu'un mineur a fourni des informations, nous supprimerons 
							immédiatement ces données.
						</p>
					</section>

					{/* Changes to Policy */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							11. Modifications de la Politique
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Nous pouvons mettre à jour cette politique de confidentialité périodiquement. 
							Les modifications importantes seront communiquées par email ou via une 
							notification sur la plateforme. Nous vous encourageons à consulter 
							régulièrement cette page pour rester informé de nos pratiques de 
							confidentialité.
						</p>
					</section>

					{/* Contact */}
					<section>
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							12. Nous Contacter
						</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Pour toute question concernant cette politique de confidentialité ou pour 
							exercer vos droits, contactez notre Délégué à la Protection des Données :
						</p>
						<div className="mt-4 p-4 bg-brand-light rounded-lg">
							<p className="text-gray-700">
								<strong>Email :</strong> privacy@agrobridge.com<br />
								<strong>Email DPO :</strong> dpo@agrobridge.com<br />
								<strong>Téléphone :</strong> +212 XXX XXX XXX<br />
								<strong>Adresse :</strong> Agrobridge, Maroc
							</p>
						</div>
					</section>

					{/* Compliance */}
					<section className="bg-brand-light p-6 rounded-lg">
						<h2 className="text-2xl font-bold text-brand-dark mb-4">
							Conformité Réglementaire
						</h2>
						<p className="text-gray-700 leading-relaxed">
							Cette politique de confidentialité est conforme au Règlement Général sur 
							la Protection des Données (RGPD), à la loi marocaine sur la protection des 
							données personnelles, et aux autres réglementations internationales 
							applicables en matière de protection des données.
						</p>
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
