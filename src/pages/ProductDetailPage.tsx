import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from '@tanstack/react-router';
import { api } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';

export const ProductDetailPage = () => {
  const { productId } = useParams({ from: '/products/$productId' });
  const { addToCart, cartItems } = useCart();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(Number(productId)),
  });

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const isInCart = !!cartItem;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error?.message || 'Failed to load product'} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded bg-gray-100">
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.rating})</span>
            </div>

            <div className="space-y-2 mb-6 text-gray-700">
              <p><span className="font-semibold">Brand:</span> {product.brand}</p>
              <p><span className="font-semibold">Category:</span> {product.category}</p>
              <p><span className="font-semibold">Stock:</span> {product.stock} available</p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
              onClick={() => {
                addToCart(product);
                if (isInCart) {
                  toast.success(`${product.title} quantity updated in cart!`);
                } else {
                  toast.success(`${product.title} added to cart!`);
                }
              }}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isInCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : product.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isInCart
                ? `In Cart (${cartItem.quantity})`
                : product.stock > 0
                ? 'Add to Cart'
                : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
