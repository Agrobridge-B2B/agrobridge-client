import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const features = [
    {
      icon: '/icons/verified.svg',
      title: 'PRODUCTEURS',
      subtitle: 'VÉRIFIÉS',
    },
    {
      icon: '/icons/world.svg',
      title: 'PAYS COUVERTS',
      subtitle: '',
    },
    {
      icon: '/icons/transaction.svg',
      title: 'TRANSACTIONS',
      subtitle: 'RÉUSSIES',
    },
    {
      icon: '/icons/satisfaction.svg',
      title: 'SATISFACTION',
      subtitle: 'CLIENT',
    },
  ];

  return (
    <section className="relative h-screen sm:h-[calc(100vh-5rem)] bg-black font-montserrat">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/main-background.jpg"
          alt="Fresh produce background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 to-[#000000]/90" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 py-8 lg:py-12 flex flex-col justify-between">
        <div className="flex lg:flex-row gap-8 items-center flex-1">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              CONNECTING SUSTAINABLE AGRICULTURE TO GLOBAL OPPORTUNITIES
            </h1>

            <p className="text-base sm:text-lg text-brand-light/90 max-w-2xl">
              The premier B2B marketplace for producers, exporters, and wholesalers to trade fruits, vegetables, grains, and livestock globally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center bg-brand-green text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-brand-green-dark transition-colors"
              >
                Explore Marketplace ↗
              </Link>
              <Link
                href="/become-seller"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-white/10 transition-colors"
              >
                Become a Seller
              </Link>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end hidden md:block">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              <Image
                src="/logo/agrobridge-01.svg"
                alt="Agrobridge Logo"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 pb-6 pt-8 lg:pt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-brand-dark/80 backdrop-blur-sm border border-brand-green/20 rounded-lg p-3 lg:p-4 flex flex-col items-center text-center hover:bg-brand-dark/90 transition-colors"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 mb-2">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <h3 className="text-white font-bold text-xs lg:text-sm mb-0.5">
                {feature.title}
              </h3>
              {feature.subtitle && (
                <p className="text-brand-light/70 text-[10px] lg:text-xs font-medium">
                  {feature.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
