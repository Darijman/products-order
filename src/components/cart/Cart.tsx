'use client';

import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { CartItem } from './cartItem/CartItem';
import './cart.css';

const shippingOptions: { value: number; label: string }[] = [
  { value: 5, label: 'Standard Delivery - $5.00' },
  { value: 20, label: 'Fast Delivery - $20.00' },
];

export const Cart = () => {
  const { cartProducts, shippingPrice, setShippingPrice, showCart, setShowCart } = useCartStore();

  const productsPrice: number = cartProducts.reduce((acc, product) => acc + product.price * product.amount, 0);
  const finalPrice: number = cartProducts.reduce((acc, product) => acc + product.price * product.amount, shippingPrice);
  const itemsAmount: number = cartProducts.reduce((acc, product) => acc + product.amount, 0);

  const closeModalOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowCart(false);
    }
  };

  return (
    <>
      {showCart && (
        <div className='cart_overlay' onClick={closeModalOnOverlayClick}>
          <div className='cart'>
            <div className='cart_left'>
              <div className='cart_left_top'>
                <h1>Shopping Cart</h1>
                <h3 className='cart_products_amount'>{itemsAmount} items</h3>
              </div>
              <div className='cart_products'>
                {cartProducts.map((product, index) => {
                  return <CartItem key={index} product={product} />;
                })}
                <hr />
              </div>
              <button onClick={() => setShowCart(false)} className='back_to_shop_button'>
                Back to shop
              </button>
            </div>
            <div className='cart_right'>
              <button onClick={() => setShowCart(false)} className='cart_right_close_cart_button'>
                X
              </button>
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
              <button disabled={!cartProducts.length} className={`place_order_button ${!cartProducts.length ? 'disabled' : ''}`}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
