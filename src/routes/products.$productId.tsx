import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPage } from '../pages/ProductDetailPage';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});
