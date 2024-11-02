import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../interfaces/Product';

interface CartState {
  cartProducts: Product[];
  shippingPrice: number;
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  setShippingPrice: (price: number) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  removeOneProduct: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartProducts: [],
      shippingPrice: 5,
      showCart: false,
      setShowCart: (showCart: boolean) => {
        set(() => ({
          showCart,
        }));
      },
      setShippingPrice: (price: number) => {
        set(() => ({ shippingPrice: price }));
      },
      addProduct: (product: Product) =>
        set((state) => {
          const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);

          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.cartProducts];
            updatedProducts[existingProductIndex].amount += 1;
            return { products: updatedProducts };
          }

          return { cartProducts: [...state.cartProducts, { ...product, amount: 1 }] };
        }),

      deleteProduct: (productId: string) => {
        set((state) => {
          const updatedProducts = state.cartProducts.filter((product) => product.id !== productId);
          return { cartProducts: updatedProducts };
        });
      },
      removeOneProduct: (productId: string) => {
        set((state) => {
          const updatedProducts = state.cartProducts
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

          return { cartProducts: updatedProducts };
        });
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);
