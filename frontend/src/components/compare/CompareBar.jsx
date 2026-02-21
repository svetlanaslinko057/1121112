/**
 * CompareBar - Sticky bottom bar for compare
 * BLOCK V2-19
 */
import React, { useEffect, useState } from "react";
import { getCompare, clearCompare } from "../../utils/compare";
import { useNavigate } from "react-router-dom";
import { Scale, Trash2 } from "lucide-react";

export default function CompareBar() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    // Initial load
    setItems(getCompare());
    
    // Listen for changes
    const handleChange = () => setItems(getCompare());
    window.addEventListener('compareChanged', handleChange);
    window.addEventListener('storage', handleChange);
    
    // Also poll every 500ms for safety
    const interval = setInterval(() => {
      setItems(getCompare());
    }, 500);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('compareChanged', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div 
      data-testid="compare-bar"
      className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex justify-between items-center z-50 shadow-2xl"
    >
      <div className="flex items-center gap-4">
        <Scale className="w-5 h-5 text-blue-400" />
        <span className="font-semibold">Обрано для порівняння: {items.length}/4</span>
        <button
          onClick={clearCompare}
          className="text-gray-400 hover:text-red-400 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => nav("/compare")}
        disabled={items.length < 2}
        className={`px-6 py-2 rounded-xl font-bold transition ${
          items.length >= 2 
            ? 'bg-white text-black hover:bg-blue-100' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        Порівняти
      </button>
    </div>
  );
}
