import Image from 'next/image';
import Link from 'next/link';

export default function GlobalMarketplace() {
  const categories = [
    {
      name: 'Citrus Fruits',
      image: '/images/categories/citrus-fruits.jpg',
      href: '/marketplace/citrus-fruits',
    },
    {
      name: 'Fresh Vegetables',
      image: '/images/categories/fresh-vegetables.jpeg',
      href: '/marketplace/vegetables',
    },
    {
      name: 'Apples',
      image: '/images/categories/apples.jpeg',
      href: '/marketplace/apples',
    },
    {
      name: 'Tomatoes',
      image: '/images/categories/tomatoes.jpg',
      href: '/marketplace/tomatoes',
    },
    {
      name: 'Coffee',
      image: '/images/categories/coffee.jpg',
      href: '/marketplace/coffee',
    },
  ];

  return (
    <section className="min-h-screen bg-brand-light py-16 lg:py-20 font-montserrat flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="text-brand-green text-sm font-medium px-4 py-2 rounded-full bg-brand-green/10">
              Global Marketplace
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark mb-4">
            Premium Agricultural <span className="text-brand-green">Categories</span>
          </h2>
          <p className="text-base lg:text-lg text-brand-gray max-w-2xl mx-auto">
            Browse products from verified suppliers worldwide
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          {/* First Row - 3 Columns: Left, Large Center, Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left - Citrus Fruits */}
            <Link
              href={categories[0].href}
              className="group relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={categories[0].image}
                alt={categories[0].name}
                fill
                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {categories[0].name}
                </h3>
              </div>
            </Link>

            {/* Center Large - Fresh Vegetables */}
            <Link
              href={categories[1].href}
              className="group relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={categories[1].image}
                alt={categories[1].name}
                fill
                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {categories[1].name}
                </h3>
              </div>
            </Link>

            {/* Right - Apples */}
            <Link
              href={categories[2].href}
              className="group relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={categories[2].image}
                alt={categories[2].name}
                fill
                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {categories[2].name}
                </h3>
              </div>
            </Link>
          </div>

          {/* Second Row - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left - Tomatoes */}
            <Link
              href={categories[3].href}
              className="group relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={categories[3].image}
                alt={categories[3].name}
                fill
                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {categories[3].name}
                </h3>
              </div>
            </Link>

            {/* Right - Coffee */}
            <Link
              href={categories[4].href}
              className="group relative overflow-hidden rounded-2xl h-[200px] md:h-[240px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={categories[4].image}
                alt={categories[4].name}
                fill
                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {categories[4].name}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
