/**
 * BLOCK V2-20: Product Section
 * Horizontal scrollable product row with title
 */
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function ProductSection({ title, sort, category, link, icon: Icon }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    params.set("limit", "12");

    fetch(`${API_URL}/api/v2/catalog?${params}`)
      .then(r => r.json())
      .then(d => {
        setItems(d.products || d.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sort, category]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="my-12 sm:my-16">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-gray-100 rounded-xl2 h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <div data-testid={`product-section-${sort || category}`} className="my-12 sm:my-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-blue-600" />}
          {title}
        </h2>
        {link && (
          <Link 
            to={link}
            className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Усі товари <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Scrollable Container */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-medium rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-medium rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Products Grid */}
        <div 
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.slice(0, 8).map(product => (
            <div key={product.id || product._id} style={{ scrollSnapAlign: 'start' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
