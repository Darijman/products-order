'use client';

import './cart.css';
import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { CartItem } from './cartItem/CartItem';

export const Cart = () => {
  const { addProduct, deleteProduct, removeOneProduct, products } = useCartStore();

  return (
    <div className='cart'>
      <div className='cart_top'>
        <h1>Shopping Cart</h1>
        <h3 className='cart_products_amount'>{products.length} items</h3>
      </div>
      <hr />
      <div>
        {products.map((product, index) => {
          return <CartItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
};
