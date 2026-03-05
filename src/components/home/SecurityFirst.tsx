import Image from "next/image";
import { FileCheck, Globe, CreditCard } from "lucide-react";

export default function SecurityFirst() {
	const features = [
		{
			icon: FileCheck,
			title: "Certification Management",
			description:
				"Automated verification of export certifications and compliance documentation",
		},
		{
			icon: Globe,
			title: "Global Logistics Network",
			description:
				"Partner with certified international shipping providers for reliable, tracked deliveries",
		},
		{
			icon: CreditCard,
			title: "Secure Payments with Stripe",
			description:
				"All transactions are protected by industry-leading encryption and fraud detection systems",
		},
	];

	return (
		<section className="relative bg-brand-light py-8 md:py-16 lg:py-20 font-montserrat flex items-center">
			<div className="max-w-7xl mx-auto px-4 w-full">
				{/* Section Header */}
				<div className="text-center mb-6 md:mb-12 lg:mb-16">
					<div className="inline-block mb-4">
						<span className="text-brand-green text-sm font-medium px-4 py-2 rounded-full bg-brand-green/10">
							Security First
						</span>
					</div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark mb-3 md:mb-4">
						Trusted & <span className="text-brand-green">Secure Platform</span>
					</h2>
					<p className="text-sm md:text-base lg:text-lg text-brand-gray max-w-2xl mx-auto">
						Industry-leading security and logistics partners
					</p>
				</div>

				{/* Image Container with Overlaid Content */}
				<div className="relative h-[600px] md:h-[400px] lg:h-[500px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
					{/* Background Image */}
					<Image
						src="/images/aron-yigin.jpg"
						alt="Secure shipping containers"
						fill
						className="object-cover"
					/>

					{/* Dark Overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/50" />

					{/* Content Container */}
					<div className="relative h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-8 lg:px-16 py-8 md:py-0">
						{/* Left - Security Badge */}
						<div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
							<Image
								src="/icons/verified-badge-green.svg"
								alt="Verified Security Badge"
								width={120}
								height={120}
								className="md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px]"
							/>
						</div>

						{/* Right - Features Grid */}
						<div className="w-full md:flex-1 space-y-4 md:space-y-6 md:max-w-xl">
							{features.map((feature, index) => {
								const Icon = feature.icon;
								return (
									<div
										key={index}
										className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
									>
										<div className="flex items-start gap-4">
											<div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 flex items-center justify-center bg-brand-green/20 rounded-lg">
												<Icon
													className="w-5 h-5 lg:w-6 lg:h-6 text-brand-green"
													strokeWidth={2}
												/>
											</div>
											<div className="flex-1">
												<h3 className="text-sm lg:text-base font-bold text-white mb-1">
													{feature.title}
												</h3>
												<p className="text-xs lg:text-sm text-white/80 leading-relaxed">
													{feature.description}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
