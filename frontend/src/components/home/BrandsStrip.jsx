/**
 * BLOCK V2-20: Brands Strip
 * Horizontal scrolling brand logos
 */
import React from "react";

const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Sony", logo: "🎮" },
  { name: "LG", logo: "📺" },
  { name: "Xiaomi", logo: "🔶" },
  { name: "Huawei", logo: "🌐" },
  { name: "Google", logo: "🔍" },
  { name: "Microsoft", logo: "🪟" },
  { name: "Dell", logo: "💻" },
  { name: "HP", logo: "🖥️" },
];

export default function BrandsStrip() {
  return (
    <div data-testid="brands-strip" className="my-12 sm:my-16">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Популярні бренди</h2>
      
      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {[...brands, ...brands].map((brand, i) => (
            <div 
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 w-32 h-20 bg-white rounded-xl shadow-soft flex items-center justify-center hover:shadow-medium transition-all cursor-pointer group"
            >
              <div className="text-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">{brand.logo}</span>
                <p className="text-xs font-semibold text-gray-600 mt-1">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
