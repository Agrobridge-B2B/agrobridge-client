import Image from 'next/image';

export default function PlatformFeatures() {

  return (
    <section className="relative min-h-[calc(100vh-5rem)] bg-brand-light py-10 font-montserrat flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="text-brand-green text-sm font-medium px-4 py-2 rounded-full bg-brand-green/10">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark mb-4">
            Built for <span className="text-brand-green">Global Trade</span>
          </h2>
          <p className="text-base lg:text-lg text-brand-gray max-w-2xl mx-auto">
            Everything you need to buy and sell agricultural products internationally
          </p>
        </div>

        {/* Map Visualization */}
        <div className="relative w-full max-w-5xl mx-auto mb-12 lg:mb-16">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/svg/MAP.svg"
              alt="Global Trade Network Map"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
