import Image from "next/image";

export default function TeamSection() {
	const team = [
		{
			name: "Mohammed Latrach",
			role: "Co-Founder & CTO",
			image: "/images/MyProfile.jpg",
			signature: "Latrach",
			bio: "Latrach is a Full Stack Developer and UI/UX Designer behind Agrobridge, building a scalable and secure agritech marketplace. He combines robust development with intuitive design to deliver a seamless experience for farmers, suppliers, and buyers worldwide.",
		},
		{
			name: "Mohamed Amine Kharmach",
			role: "Co-Founder & CEO",
			image: "/images/amin.png",
			signature: "",
			bio: "With over a decade of experience in international agricultural trade, Mohamed Amine brings deep industry knowledge and a passion for connecting farmers to global opportunities. His vision is to create a transparent, efficient marketplace that empowers agricultural producers worldwide.",
		},
	];

	return (
		<section className="relative md:h-[calc(100vh-5rem)] bg-white py-8 lg:py-12 font-montserrat flex items-center">
			<div className="max-w-7xl mx-auto px-4 w-full">
				{/* Section Header */}
				<div className="text-center mb-6 lg:mb-8">
					<h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-dark mb-3">
						The Visionaries Behind{" "}
						<span className="text-brand-green">Agrobridge</span>
					</h2>
					<p className="text-sm lg:text-base text-brand-gray max-w-3xl mx-auto">
						Focused on bridging the gap between local farmers and global market
						through innovative Agritech solutions
					</p>
				</div>

				{/* Team Grid */}
				<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
					{team.map((member, index) => (
						<div
							key={index}
							className="bg-brand-light rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
						>
							{/* Photo */}
							<div className="relative h-[250px] lg:h-[280px] bg-gray-200">
								<Image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
								/>
								{member.signature && (
									<div className="absolute bottom-4 right-4">
										<p className="text-3xl font-signature text-brand-dark/30">
											{member.signature}
										</p>
									</div>
								)}
							</div>

							{/* Info */}
							<div className="p-4 lg:p-6">
								<h3 className="text-xl lg:text-2xl font-bold text-brand-dark mb-2 text-center">
									{member.name}
								</h3>
								<div className="flex items-center justify-center gap-3 mb-3">
									<div className="h-1 w-12 bg-brand-green"></div>
									<p className="text-brand-green font-semibold text-xs lg:text-sm">
										{member.role}
									</p>
									<div className="h-1 w-12 bg-brand-green"></div>
								</div>
								<p className="text-brand-gray leading-relaxed text-xs lg:text-sm text-justify">
									{member.bio}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
