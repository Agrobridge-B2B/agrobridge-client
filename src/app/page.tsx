import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GlobalMarketplace from '@/components/GlobalMarketplace';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      <HeroSection />
      <GlobalMarketplace />
    </div>
  );
}
