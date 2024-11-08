'use client';

import { Order } from '../../interfaces/Order';
import { OrderItem } from '../../components/orderItem/OrderItem';
import { products } from '../../fixtures/products';
import './orders.css';

const order: Order = {
  id: '1',
  products: products,
  address: 'Pushkina 44',
  orderPlacedDate: new Date(),
  deliveryDate: new Date(),
  isDelivered: false,
  totalPrice: 500,
  shippingType: 'FAST',
};

const orders = [order, order];

const Orders = () => {
  return (
    <div>
      <h1 className='orders_title'>Your Orders</h1>
      <div>
        {orders.map((order, index) => {
          return (
            <>
              <OrderItem key={index} order={order} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
