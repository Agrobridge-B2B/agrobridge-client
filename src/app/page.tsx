import Navbar from '@/components/Navbar';
import HeroSection from '@/components/home/HeroSection';
import GlobalMarketplace from '@/components/home/GlobalMarketplace';
import PlatformFeatures from '@/components/home/PlatformFeatures';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      <HeroSection />
      <GlobalMarketplace />
      <PlatformFeatures />
    </div>
  );
}
