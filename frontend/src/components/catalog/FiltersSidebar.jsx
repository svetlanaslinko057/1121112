/**
 * FiltersSidebar Component - Retail Filters
 * BLOCK F2.0
 */
import React from "react";
import { X } from "lucide-react";

const BRANDS = ["Apple", "Samsung", "Xiaomi", "Sony", "LG", "Huawei", "Google", "OnePlus"];

export default function FiltersSidebar({ filters, setFilters, priceRange }) {
  
  function update(key, value) {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  }

  function toggleBrand(brand) {
    const currentBrands = filters.brands || [];
    if (currentBrands.includes(brand)) {
      update("brands", currentBrands.filter(b => b !== brand));
    } else {
      update("brands", [...currentBrands, brand]);
    }
  }

  return (
    <div className="w-64 space-y-6 bg-white rounded-2xl p-6 shadow-sm border">

      {/* Price */}
      <div>
        <h3 className="font-bold mb-3 text-gray-900">Ціна, грн</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="від"
            value={filters.min_price || ""}
            className="border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={e => update("min_price", e.target.value)}
          />
          <span className="self-center text-gray-400">—</span>
          <input
            type="number"
            placeholder="до"
            value={filters.max_price || ""}
            className="border rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={e => update("max_price", e.target.value)}
          />
        </div>
        
        {/* Price Range Slider */}
        <div className="mt-4">
          <input
            type="range"
            min={priceRange?.min || 0}
            max={priceRange?.max || 100000}
            value={filters.max_price || priceRange?.max || 100000}
            onChange={e => update("max_price", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{priceRange?.min || 0} грн</span>
            <span>{priceRange?.max || 100000} грн</span>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-bold mb-3 text-gray-900">Бренд</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {BRANDS.map(b => (
            <label key={b} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(b)}
                onChange={() => toggleBrand(b)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 group-hover:text-blue-600 transition">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.in_stock || false}
            onChange={e => update("in_stock", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 font-medium">Тільки в наявності</span>
        </label>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-bold mb-3 text-gray-900">Рейтинг</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.min_rating === rating}
                onChange={() => update("min_rating", rating)}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 flex items-center gap-1">
                {"★".repeat(rating)}{"☆".repeat(5-rating)}
                <span className="text-gray-500 text-sm">і вище</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => setFilters({})}
        className="w-full py-2 text-red-600 hover:bg-red-50 rounded-xl transition flex items-center justify-center gap-2"
      >
        <X className="w-4 h-4" />
        Скинути фільтри
      </button>

    </div>
  );
}
