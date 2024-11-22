'use client';

import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { CartItem } from './cartItem/CartItem';
import { useOrdersStore } from '../../stores/useOrdersStore/useOrdersStore';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Loader } from '../../ui/loader/Loader';
import './cart.css';

const shippingOptions: { value: number; label: string }[] = [
  { value: 5, label: 'Standard Delivery - $5.00' },
  { value: 20, label: 'Fast Delivery - $20.00' },
];

export const Cart = () => {
  const { cartProducts, shippingPrice, setShippingPrice, showCart, setShowCart, clearCart } = useCartStore();
  const { addOrder } = useOrdersStore();

  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [address, setAddress] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const productsPrice: number = cartProducts.reduce((acc, product) => acc + product.price * product.amount, 0);
  const totalPrice: number = productsPrice + shippingPrice;
  const itemsAmount: number = cartProducts.reduce((acc, product) => acc + product.amount, 0);

  const closeModalOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowCart(false);
    }
  };

  const handlePlaceOrder = () => {
    setShowLoader(true);
    setShowCart(false);

    setTimeout(() => {
      const newOrder = {
        id: nanoid(),
        products: cartProducts,
        totalPrice: totalPrice,
        orderPlacedDate: new Date(),
        deliveryDate: new Date(selectedTime),
        address: address,
        shippingType: shippingPrice === 5 ? ('STANDARD' as const) : ('FAST' as const),
        isDelivered: false,
      };

      addOrder(newOrder);
      setShowLoader(false);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        setShowCart(false);
        setSelectedTime(new Date());
        setAddress('');
        clearCart();
      }, 1500);
    }, 1500);
  };

  const placeOrderButtonDisabled = !cartProducts.length || !address.trim();

  return (
    <>
      {showLoader || showMessage ? (
        <div className='loader_overlay'>
          <div className='loader_container'>
            {showLoader ? (
              <Loader showLoader={showLoader} />
            ) : showMessage ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', color: '#FFFFFF', marginRight: '10px' }}>✓</span>
                <h3 className='loader_title'>Order Placed!</h3>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {showCart && (
        <div className='cart_overlay' onClick={closeModalOnOverlayClick}>
          <div className='cart'>
            <div className='cart_left'>
              <div className='cart_left_top'>
                <h1 className='cart_left_top_title'>Shopping Cart</h1>
                <h3 className='cart_products_amount'>{itemsAmount} items</h3>
                <button onClick={() => setShowCart(false)} className='cart_left_close_cart_button'>
                  X
                </button>
              </div>
              <div className={`cart_products ${cartProducts.length === 0 ? 'empty' : ''}`}>
                {cartProducts.map((product, index) => (
                  <CartItem key={index} product={product} />
                ))}
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
                  {shippingOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='select_time'>
                <label htmlFor='time-input' className='give_code_label'>
                  SELECT TIME
                </label>
                <input
                  id='time-input'
                  placeholder='Please select time'
                  className='select_time_input'
                  type='datetime-local'
                  onChange={(event) => setSelectedTime(event.target.value ? new Date(event.target.value) : new Date())}
                  value={selectedTime ? selectedTime.toISOString().slice(0, 16) : ''}
                />
              </div>
              <div className='address'>
                <label htmlFor='address-input' className='address_label'>
                  ENTER YOUR ADDRESS
                </label>
                <input
                  id='address-input'
                  placeholder='Your Address'
                  className='address_input'
                  type='text'
                  maxLength={50}
                  onChange={(event) => setAddress(event.target.value)}
                  value={address}
                />
              </div>
              <hr />
              <div className='total_info'>
                <h3 className='total_info_title'>TOTAL PRICE</h3>
                <h3 className='total_info_price'>$ {totalPrice.toFixed(1)}</h3>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placeOrderButtonDisabled}
                className={`place_order_button ${placeOrderButtonDisabled ? 'disabled' : ''}`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
