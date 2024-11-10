import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../../interfaces/Order';

interface OrdersState {
  orders: Order[];
  deleteOrder: (orderId: string) => void;
  addOrder: (order: Order) => void;
  finishOrder: (orderId: string) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      deleteOrder: (orderId: string) => {
        set((state) => {
          const newOrders = state.orders.filter((order) => order.id !== orderId);
          return {
            orders: newOrders,
          };
        });
      },
      addOrder: (order: Order) => {
        set((state) => {
          return {
            orders: [...state.orders, order],
          };
        });
      },
      finishOrder: (orderId: string) => {
        set((state) => {
          const updatedOrders = state.orders.map((order) => (order.id === orderId ? { ...order, isDelivered: true } : order));
          return {
            orders: updatedOrders,
          };
        });
      },
    }),
    {
      name: 'orders-store',
    },
  ),
);
