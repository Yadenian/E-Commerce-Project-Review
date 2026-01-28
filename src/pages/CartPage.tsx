import { Link, useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, checkout, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    toast.info('Processing your order...', { autoClose: 2000 });

    try {
      const success = await checkout();
      if (success) {
        toast.success('Order placed successfully! Thank you for your purchase!', {
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate({ to: '/' });
        }, 2000);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleRemoveFromCart = (productId: number, productTitle: string) => {
    removeFromCart(productId);
    toast.info(`${productTitle} removed from cart`);
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      toast.info('Cart is already empty');
      return;
    }
    clearCart();
    toast.info('Cart cleared');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              <Link
                to="/products/$productId"
                params={{ productId: item.id.toString() }}
                className="flex-shrink-0"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to="/products/$productId"
                  params={{ productId: item.id.toString() }}
                  className="font-semibold text-lg hover:text-blue-600"
                >
                  {item.title}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{item.brand}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateQuantity(item.id, item.quantity - 1);
                        if (item.quantity > 1) {
                          toast.info(`${item.title} quantity decreased`);
                        }
                      }}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => {
                        updateQuantity(item.id, item.quantity + 1);
                        toast.info(`${item.title} quantity increased`);
                      }}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id, item.title)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <Link
              to="/"
              className="block text-center text-blue-600 hover:text-blue-700 mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
