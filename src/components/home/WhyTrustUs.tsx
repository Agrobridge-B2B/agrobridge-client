import Image from "next/image";
import { Globe, ShieldCheck, MessageSquare, CreditCard } from "lucide-react";

export default function WhyTrustUs() {
	const features = [
		{
			icon: Globe,
			title: "International Reach",
			description: "Connect with buyers and sellers across 50+ countries",
		},
		{
			icon: ShieldCheck,
			title: "Verified Sellers Only",
			description: "All sellers undergo strict quality verification process",
		},
		{
			icon: MessageSquare,
			title: "Real-Time Chat",
			description: "Instant messaging between buyers and sellers worldwide",
		},
		{
			icon: CreditCard,
			title: "Secure Payments",
			description: "Protected transactions with Stripe integration",
		},
	];

	return (
		<section className="relative bg-brand-light py-8 md:py-16 lg:py-20 pb-16 md:pb-16 font-montserrat flex items-center">
			<div className="max-w-7xl mx-auto px-4 w-full">
				{/* Section Header */}
				<div className="text-center mb-6 md:mb-12 lg:mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark mb-3 md:mb-4">
						Why Global Traders{" "}
						<span className="text-brand-green">Trust Us</span>
					</h2>
					<p className="text-sm md:text-base lg:text-lg text-brand-gray max-w-2xl mx-auto">
						Connect with verified sellers worldwide and trade with confidence
					</p>
				</div>

				{/* Image Container with Overlaid Content */}
				<div className="relative h-[600px] md:h-[400px] lg:h-[500px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
					{/* Background Image */}
					<Image
						src="/images/agriculture.jpg"
						alt="Agricultural worker"
						fill
						className="object-cover bg-right"
					/>

					{/* Black Overlay */}
					<div className="absolute inset-0 bg-black/60" />

					{/* Gradient Overlay */}
					<div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(270deg, rgba(120, 200, 65, 0.7) 0%, rgba(120, 200, 65, 0) 100%)",
						}}
					/>

					{/* Content Container */}
					<div className="relative h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-8 lg:px-16 py-8 md:py-0">
						{/* Left - Quality Badge */}
						<div className="w-full h-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
							<Image
								src="/icons/verified-badge.svg"
								alt="Verified Badge"
								width={100}
								height={100}
								className="md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px]"
							/>
						</div>

						{/* Right - Features Grid */}
						<div className="w-full md:flex-1 grid grid-cols-2 gap-3 lg:gap-4 md:max-w-xl">
							{features.map((feature, index) => {
								const Icon = feature.icon;
								return (
									<div
										key={index}
										className="bg-white/20 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-white/30 hover:bg-white/30 transition-all duration-300"
									>
										<div className="flex flex-col items-center text-center">
											<div className="w-8 h-8 lg:w-10 lg:h-10 mb-2 flex items-center justify-center">
												<Icon
													className="w-5 h-5 lg:w-6 lg:h-6 text-white"
													strokeWidth={2}
												/>
											</div>
											<h3 className="text-xs lg:text-sm font-bold text-white mb-1">
												{feature.title}
											</h3>
											<p className="text-[10px] lg:text-xs text-white/90 leading-relaxed">
												{feature.description}
											</p>
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
