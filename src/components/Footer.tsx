import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
	const footerSections = [
		{
			title: "Marketplace",
			links: [
				{ label: "Browse Products", href: "/marketplace" },
				{ label: "Seller Dashboard", href: "/seller/dashboard" },
				{ label: "Buyer Portal", href: "/buyer/portal" },
				{ label: "Pricing", href: "/pricing" },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "Careers", href: "/careers" },
				{ label: "Blog", href: "/blog" },
				{ label: "Press Kit", href: "/press" },
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Help Center", href: "/help" },
				{ label: "Contact Us", href: "/contact" },
				{ label: "Terms of Service", href: "/terms" },
				{ label: "Privacy Policy", href: "/privacy" },
			],
		},
	];

	const socialLinks = [
		{ icon: Linkedin, href: "#", ariaLabel: "LinkedIn" },
		{ icon: Twitter, href: "#", ariaLabel: "Twitter" },
		{ icon: Facebook, href: "#", ariaLabel: "Facebook" },
	];

	return (
		<footer className="bg-brand-dark text-white font-montserrat">
			<div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
					{/* Brand Section */}
					<div className="lg:col-span-1">
						<Link href="/" className="inline-block">
							<Image
								src="/logo/agrobridge-01.svg"
								alt="Agrobridge Logo"
								width={180}
								height={200}
								className="h-28 w-auto"
							/>
						</Link>
						<p className="text-sm text-gray-400 mb-6 leading-relaxed">
							Connecting the world's harvest through innovative B2B marketplace
							solutions.
						</p>

						{/* Social Links */}
						<div className="flex gap-3">
							{socialLinks.map((social, index) => {
								const Icon = social.icon;
								return (
									<Link
										key={index}
										href={social.href}
										aria-label={social.ariaLabel}
										className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-green transition-colors duration-300"
									>
										<Icon className="w-5 h-5 text-white" />
									</Link>
								);
							})}
						</div>
					</div>

					{/* Footer Links */}
					{footerSections.map((section, index) => (
						<div key={index}>
							<h3 className="text-white font-bold text-base mb-4">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link
											href={link.href}
											className="text-sm text-gray-400 hover:text-brand-green transition-colors duration-300"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-white/10">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-gray-400">
							©{" "}
							{new Date().getFullYear() > 2026
								? `2026-${new Date().getFullYear()}`
								: "2026"}{" "}
							Agrobridge. All rights reserved
						</p>

						<div className="flex items-center gap-2 text-sm text-gray-400">
							<ShieldCheck className="w-4 h-4 text-brand-green" />
							<span>Trusted by 500+ verified sellers worldwide</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
