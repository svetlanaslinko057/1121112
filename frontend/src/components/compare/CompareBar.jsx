/**
 * BLOCK V2-19: CompareBar
 * Sticky compare bar at bottom when items selected
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../../contexts/ComparisonContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function CompareBar() {
  const { comparisonItems, removeFromComparison, clearComparison, maxItems } = useComparison();
  const navigate = useNavigate();

  if (comparisonItems.length === 0) return null;

  return (
    <div 
      data-testid="compare-bar"
      className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 z-50 shadow-2xl border-t border-slate-700"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left - Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">
              Порівняння: {comparisonItems.length}/{maxItems}
            </span>
          </div>
          
          {/* Mini product previews */}
          <div className="hidden md:flex items-center gap-2">
            {comparisonItems.map((item) => (
              <div 
                key={item.id} 
                className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 border border-white/20"
              >
                {item.images?.[0] ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs">📦</div>
                )}
                <button
                  onClick={() => removeFromComparison(item.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearComparison}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Очистити</span>
          </Button>
          
          <Button
            onClick={() => navigate('/comparison')}
            disabled={comparisonItems.length < 2}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
          >
            <span>Порівняти</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
