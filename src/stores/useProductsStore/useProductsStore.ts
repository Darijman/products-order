import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../interfaces/Product';
import { products } from '../../fixtures/products';

interface ProductsState {
  products: Product[];
  category: string;
  setCategory: (category: string) => void;
  categoryProducts: Product[];
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: products,
      category: '',
      setCategory: (category: string) => {
        set((state) => {
          if (category.trim()) {
            const categoryProducts = state.products.filter((product) => product.category === category);
            return {
              category,
              categoryProducts,
            };
          }
          return {
            category,
            products: products,
          };
        });
      },
      categoryProducts: [],
    }),
    {
      name: 'products-store',
    },
  ),
);
