/**
 * BLOCK V2-20: Deal of the Day
 * Countdown timer with featured product
 */
import React, { useState, useEffect } from "react";
import { Flame, Clock, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function DealOfDay() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [product, setProduct] = useState(null);

  function calculateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return Math.floor((endOfDay - now) / 1000);
  }

  useEffect(() => {
    // Fetch a random discounted product
    fetch(`${API_URL}/api/v2/catalog?sort=discount&limit=1`)
      .then(r => r.json())
      .then(d => {
        const items = d.products || d.items || [];
        if (items.length) setProduct(items[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div 
      data-testid="deal-of-day"
      className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-xl2 shadow-medium p-6 sm:p-10 my-12 sm:my-16"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left - Timer */}
        <div className="text-center lg:text-left">
          <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
            <Flame className="w-6 h-6 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
              Гаряча ціна дня
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Встигни купити!
          </h2>
          
          {/* Timer */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{pad(hours)}</div>
              <div className="text-xs opacity-80">годин</div>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{pad(minutes)}</div>
              <div className="text-xs opacity-80">хвилин</div>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{pad(seconds)}</div>
              <div className="text-xs opacity-80">секунд</div>
            </div>
          </div>
        </div>

        {/* Right - Product (if available) */}
        {product && (
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            {product.images?.[0] && (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl bg-white"
              />
            )}
            <div>
              <h3 className="font-bold text-lg sm:text-xl line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                {product.old_price && (
                  <span className="text-white/60 line-through">
                    {product.old_price?.toLocaleString()} грн
                  </span>
                )}
                <span className="text-2xl font-bold">
                  {product.price?.toLocaleString()} грн
                </span>
              </div>
              <Link 
                to={`/product/${product.slug || product.id}`}
                className="inline-flex items-center gap-2 mt-3 bg-white text-red-600 px-5 py-2 rounded-xl font-bold hover:bg-red-50 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                Купити
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
