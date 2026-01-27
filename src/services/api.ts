import type { Product, ProductsResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

export const api = {
  // Get all products with pagination
  getProducts: async (skip: number = 0, limit: number = 30): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/products?skip=${skip}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },
};
