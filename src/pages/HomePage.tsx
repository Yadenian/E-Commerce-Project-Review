import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useState } from 'react';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const limit = 30;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', skip, searchQuery],
    queryFn: () =>
      searchQuery
        ? api.searchProducts(searchQuery)
        : api.getProducts(skip, limit),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSkip(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <LoadingSpinner />}

      {isError && <ErrorMessage message={error?.message || 'Failed to load products'} />}

      {data && (
        <>
          <div className="mb-4 text-gray-600">
            Showing {data.products.length} of {data.total} products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
              disabled={skip === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setSkip((prev) => prev + limit)}
              disabled={skip + limit >= data.total}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
