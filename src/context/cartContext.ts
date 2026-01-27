import { createContext } from 'react';
import type { CartItem, Product } from '../types';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
