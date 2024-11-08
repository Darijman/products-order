'use client';

import { Order } from '../../interfaces/Order';
import Image from 'next/image';
import './orderItem.css';

export const OrderItem = ({ order }: { order: Order }) => {
  const { id, products, address, orderPlacedDate, deliveryDate, isDelivered, shippingType, totalPrice } = order;

  return (
    <div className='order_item'>
      <div className='order_top'>
        <h2 className='order_id_title'>Order ID: {id}</h2>
        <div className='order_buttons'>
          <button className='delivered_button' title='Change Status'>
            🚚 ✓
          </button>
          <button title='Delete Order' className='delete_order_button'></button>
        </div>
      </div>
      <div className='order_info'>
        <div className='order_dates'>
          <h3 className='order_placed_date'>
            Order Placed: <span style={{ opacity: 0.6, marginLeft: '9px' }}>{orderPlacedDate.toDateString()}</span>
          </h3>
          <h3 className='order_delivery_date'>
            Delivery Date: <span style={{ opacity: 0.6 }}>{deliveryDate.toDateString()}</span>
          </h3>
        </div>
        <div className='line_separator'></div>
        <div>
          <h3 className='status_title'>Status</h3>
          <h4 className='status_type'>{isDelivered ? 'Delivered' : 'Coming'}</h4>
        </div>
        <div className='line_separator'></div>
        <div>
          <h3 className='shipping_type_title'>Shipping Type</h3>
          <h4 className='shipping_type'>{shippingType}</h4>
        </div>
        <div className='line_separator'></div>
        <div>
          <h3 className='address_title'>Address</h3>
          <h4 className='address_text'>{address}</h4>
        </div>
        <div className='line_separator'></div>
        <div>
          <h3 className='total_price_title'>Total Price</h3>
          <h4 className='total_price_text'>$ {totalPrice}</h4>
        </div>
      </div>
      <div>
        <hr className='product_line_separator' />
        <div>
          {products.map((product, index) => {
            const { title, category, amount, price, image } = product;
            const itemPrice = amount * price;
            const isLastItem = index === products.length - 1;

            return (
              <div key={index} style={{ marginBottom: isLastItem ? '0' : '30px' }}>
                <div className='product_container'>
                  <Image src={image} width={100} height={100} alt={title} priority={true} />
                  <div className='product_name'>
                    <h3 className='product_category'>{category}</h3>
                    <h3 className='product_title'>{title}</h3>
                  </div>
                  <span className='product_amount'>{amount}</span>
                  <h3 className='product_price'>$ {itemPrice}</h3>
                </div>
                <hr className='product_line_separator' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
