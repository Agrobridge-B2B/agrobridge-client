"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Our Mission", href: "/our-mission" },
		{ name: "À Propos", href: "/about" },
		{ name: "CGV", href: "/cgv" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<nav className="bg-white shadow-sm sticky top-0 z-50 font-montserrat">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image
							src="/logo/agrobridge-01.svg"
							alt="Agrobridge Logo"
							width={100}
							height={100}
							className="h-20 w-auto"
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-brand-dark hover:text-brand-green font-medium text-sm transition-colors"
							>
								{link.name}
							</Link>
						))}
					</div>

					{/* Desktop Auth Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						<Link
							href="/login"
							className="text-brand-dark hover:text-brand-green font-medium text-sm transition-colors"
						>
							Sign in
						</Link>
						<Link
							href="/register"
							className="bg-brand-green text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-brand-green-dark transition-colors"
						>
							Get Started
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-md text-brand-dark hover:bg-gray-100"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{isMenuOpen ? (
								<path d="M6 18L18 6M6 6l12 12" />
							) : (
								<path d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu - Full Screen */}
			<div
				className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${
					isMenuOpen
						? "opacity-100 visible translate-y-0"
						: "opacity-0 invisible -translate-y-full"
				}`}
				style={{ top: "5rem" }}
			>
				<div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="text-brand-dark hover:text-brand-green font-medium text-lg transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							{link.name}
						</Link>
					))}
					<div className="pt-6 flex flex-col items-center space-y-4 w-full max-w-xs">
						<Link
							href="/login"
							className="text-brand-dark hover:text-brand-green font-medium text-lg transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Sign in
						</Link>
						<Link
							href="/register"
							className="bg-brand-green text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-brand-green-dark transition-colors text-center w-full"
							onClick={() => setIsMenuOpen(false)}
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
