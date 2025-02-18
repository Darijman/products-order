'use client';

import { useMemo } from 'react';
import { OrderItem } from '../../components/orderItem/OrderItem';
import { useOrdersStore } from '../../stores/useOrdersStore/useOrdersStore';
import { useRouter, useSearchParams } from 'next/navigation';
import './orders.css';

const Orders = () => {
  const { orders } = useOrdersStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortedByFromURL = searchParams.get('sortedBy') || 'DEFAULT';

  const sortedOrders = useMemo(() => {
    if (sortedByFromURL === 'DELIVERED') {
      return [...orders].sort((a, b) => Number(b.isDelivered) - Number(a.isDelivered));
    }

    if (sortedByFromURL === 'TOTALPRICE') {
      return [...orders].sort((a, b) => b.totalPrice - a.totalPrice);
    }

    return orders;
  }, [orders, sortedByFromURL]);

  const sortedByOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    if (newSortBy === 'DEFAULT') {
      router.push(`/orders`);
    } else {
      router.push(`/orders?sortedBy=${newSortBy}`);
    }
  };

  return (
    <>
      <div>
        <h1 className='orders_title'>Your Orders {orders.length >= 1 ? `(${orders.length})` : null}</h1>
        {orders.length ? (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='orders_sort' style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '18px' }}>
              Sort orders:
            </label>
            <select id='orders_sort' className='orders_sort' value={sortedByFromURL} onChange={sortedByOnChangeHandler}>
              <option value='DEFAULT'>By Default</option>
              <option value='DELIVERED'>By Delivered</option>
              <option value='TOTALPRICE'>By Total Price</option>
            </select>
          </div>
        ) : null}
      </div>
      <div>
        {sortedOrders.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
