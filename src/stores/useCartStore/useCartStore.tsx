import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../interfaces/Product';

interface CartState {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  removeOneProduct: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: Product) =>
        set((state) => {
          const existingProductIndex = state.products.findIndex((p) => p.id === product.id);

          if (existingProductIndex) {
            const updatedProducts = [...state.products];
            updatedProducts[existingProductIndex].amount += product.amount;
            return { products: updatedProducts };
          }

          return { products: [...state.products, product] };
        }),
      deleteProduct: (productId: string) => {
        set((state) => {
          const updatedProducts = state.products.filter((product) => product.id !== productId);
          return { products: updatedProducts };
        });
      },
      removeOneProduct: (productId: string) => {
        set((state) => {
          const updatedProducts = state.products
            .map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  amount: product.amount > 1 ? product.amount - 1 : 0,
                };
              }
              return product;
            })
            .filter((product) => product.amount > 0);

          return { products: updatedProducts };
        });
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);
