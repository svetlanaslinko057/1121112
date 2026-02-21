/**
 * BLOCK V2-20: Hero Carousel
 * Auto-rotating banner carousel with overlay text
 */
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Знижки до -30%",
    subtitle: "На техніку Apple",
    cta: "Переглянути",
    link: "/catalog?brand=Apple",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1400&h=500&fit=crop",
    gradient: "from-blue-900/80 to-purple-900/60"
  },
  {
    id: 2,
    title: "Телевізори 4K",
    subtitle: "Від 9 999 грн",
    cta: "До каталогу",
    link: "/catalog?category=tv",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1400&h=500&fit=crop",
    gradient: "from-slate-900/80 to-blue-900/60"
  },
  {
    id: 3,
    title: "Новинки Samsung",
    subtitle: "Galaxy S24 вже в наявності",
    cta: "Замовити",
    link: "/catalog?brand=Samsung",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1400&h=500&fit=crop",
    gradient: "from-indigo-900/80 to-pink-900/60"
  }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = slides[index];

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  return (
    <div 
      data-testid="hero-carousel"
      className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden rounded-2xl shadow-medium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-700">
        <img
          src={slide.image}
          className="w-full h-full object-cover"
          alt={slide.title}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 sm:px-10 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold animate-fadeInUp">
            {slide.title}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mt-3 opacity-90 animate-fadeInUp animation-delay-100">
            {slide.subtitle}
          </p>
          <Link 
            to={slide.link}
            className="inline-block mt-6 bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all hover:-translate-y-1 shadow-lg animate-fadeInUp animation-delay-200"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
