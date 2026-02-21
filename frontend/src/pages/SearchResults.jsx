/**
 * BLOCK V2-19: Search Results Page
 * Full search results with live suggestions
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setProducts([]);
        setTotal(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/v2/search`, {
          params: { q: query, page, limit: 24 }
        });
        setProducts(response.data.products || []);
        setTotal(response.data.total || 0);
      } catch (error) {
        console.error('Search failed:', error);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  return (
    <div data-testid="search-results" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-8">
      <div className="container-main px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            Результати пошуку
          </h1>
          {query && (
            <p className="text-gray-600">
              Знайдено <span className="font-semibold">{total}</span> товарів за запитом "{query}"
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 rounded-full p-8 mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Нічого не знайдено</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Спробуйте змінити запит або перегляньте наш каталог
            </p>
            <Link to="/catalog">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Перейти до каталогу
              </Button>
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {total > 24 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(total / 24) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
