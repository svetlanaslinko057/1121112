/**
 * BLOCK V2-19: Wishlist Page Enhanced
 * Full wishlist page with backend sync
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const Wishlist = () => {
  const { favorites, clearFavorites, favoritesCount } = useFavorites();
  const { t } = useLanguage();

  if (favoritesCount === 0) {
    return (
      <div data-testid="wishlist-empty" className="min-h-screen py-16">
        <div className="container-main">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-full p-8 mb-6">
              <Heart className="w-16 h-16 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Список обраного порожній</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Ви ще не додали жодного товару в обране. Почніть переглядати товари і додавайте сподобані!
            </p>
            <Link to="/catalog">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                <ShoppingBag className="w-5 h-5" />
                Перейти до каталогу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="wishlist-page" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-8">
      <div className="container-main px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
              Обране
            </h1>
            <p className="text-gray-600">{favoritesCount} товарів</p>
          </div>
          {favoritesCount > 0 && (
            <Button
              variant="outline"
              onClick={clearFavorites}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Очистити все
            </Button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
