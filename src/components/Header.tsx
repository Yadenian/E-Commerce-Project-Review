import { Link } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';

export const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            E-Commerce
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              activeProps={{ className: 'text-blue-600 font-semibold' }}
            >
              Products
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              activeProps={{ className: 'text-blue-600 font-semibold' }}
            >
              Register
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
              activeProps={{ className: 'text-blue-600 font-semibold' }}
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
