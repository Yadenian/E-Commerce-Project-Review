import { Link } from '@tanstack/react-router';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const existingItem = cartItems.find((item) => item.id === product.id);
    addToCart(product);
    if (existingItem) {
      toast.success(`${product.title} quantity updated in cart!`);
    } else {
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};
