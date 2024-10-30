'use client';

import './cart.css';
import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { CartItem } from './cartItem/CartItem';

const shippingOptions: { value: number; label: string }[] = [
  { value: 5, label: 'Standard Delivery - $5.00' },
  { value: 20, label: 'Fast Delivery - $20.00' },
];

export const Cart = () => {
  const { addProduct, deleteProduct, removeOneProduct, products, shippingPrice, setShippingPrice } = useCartStore();

  const productsPrice: number = products.reduce((acc, product) => acc + product.price * product.amount, 0);
  const finalPrice: number = products.reduce((acc, product) => acc + product.price * product.amount, shippingPrice);
  const itemsAmount: number = products.reduce((acc, product) => acc + product.amount, 0);

  console.log(`products`, products);
  
  return (
    <div className='cart'>
      <div className='cart_left'>
        <div className='cart_left_top'>
          <h1>Shopping Cart</h1>
          <h3 className='cart_products_amount'>{itemsAmount} items</h3>
        </div>
        <div className='cart_products'>
          {products.map((product, index) => {
            return <CartItem key={index} product={product} />;
          })}
          <hr />
        </div>
        <button className='back_to_shop_button'>Back to shop</button>
      </div>
      <div className='cart_right'>
        <h2 className='cart_right_title'>Summary</h2>
        <hr />
        <div className='cart_right_order_info'>
          <h3 className='cart_right_items_title'>ITEMS {itemsAmount}</h3>
          <h3 className='cart_right_products_price'>$ {productsPrice}</h3>
        </div>
        <div className='shipping'>
          <label htmlFor='shipping-select' className='shipping_label'>
            SHIPPING
          </label>
          <select id='shipping-select' className='shipping_select' onChange={(e) => setShippingPrice(Number(e.target.value))}>
            {shippingOptions.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className='give_code'>
          <label htmlFor='code-input' className='give_code_label'>
            GIVE CODE
          </label>
          <input id='code-input' placeholder='Enter your code' className='give_code_input' />
        </div>
        <hr />
        <div className='total_info'>
          <h3 className='total_info_title'>TOTAL PRICE</h3>
          <h3 className='total_info_price'>$ {finalPrice}</h3>
        </div>
        <button disabled={!products.length} className={`place_order_button ${!products.length ? 'disabled' : ''}`}>
          Place Order
        </button>
      </div>
    </div>
  );
};
