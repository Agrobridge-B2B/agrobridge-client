import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import GlobalMarketplace from "@/components/home/GlobalMarketplace";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import WhyTrustUs from "@/components/home/WhyTrustUs";
import TeamSection from "@/components/home/TeamSection";

export default function Home() {
	return (
		<div className="min-h-screen bg-brand-light">
			<Navbar />
			<HeroSection />
			<GlobalMarketplace />
			<PlatformFeatures />
			<WhyTrustUs />
			<TeamSection />
		</div>
	);
}
