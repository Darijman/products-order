'use client';

import { useState } from 'react';
import { Order } from '../../interfaces/Order';
import { useOrdersStore } from '../../stores/useOrdersStore/useOrdersStore';
import { Modal } from '../../ui/modal/Modal';
import Image from 'next/image';
import './orderItem.css';

function formatCustomDate(date: Date): string {
  const day = date.getDate();
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const year = date.getFullYear();

  return `${day} ${monthName} ${time}, ${year}`;
}

export const OrderItem = ({ order }: { order: Order }) => {
  const { id, products, address, orderPlacedDate, deliveryDate, isDelivered, shippingType, totalPrice } = order;
  const { orders, finishOrder, deleteOrder } = useOrdersStore();
  const [showDeletingModal, setShowDeletingModal] = useState<boolean>(false);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);

  console.log(`orderPlacedDate`, orderPlacedDate);
  console.log(`orders`, orders);

  const formattedOrderPlacedDate = formatCustomDate(new Date(orderPlacedDate));
  const formateedDeliveryDate = formatCustomDate(new Date(deliveryDate));

  const deleteOrderHandler = (orderId: string) => {
    deleteOrder(orderId);
    setShowDeletingModal(false);
  };

  const finishOrderHandler = (orderId: string) => {
    finishOrder(orderId);
    setShowFinishModal(false);
  };

  const deletingModalTitle = isDelivered
    ? `Do you really want to delete this order from the history?`
    : `You still didn't receive the order, do you want to cancel order?`;

  const itemsAmount: number = products.reduce((acc, product) => (acc += product.amount), 0);

  return (
    <div className={`order_item ${isDelivered ? 'delivered' : ''}`}>
      <div className='order_top'>
        <h2 className='order_id_title'>
          Order ID:
          <span style={{ marginLeft: 5, opacity: 0.6 }}>{id}</span>
        </h2>
        <h2>
          Items Amount:
          <span style={{ marginLeft: 5, opacity: 0.6 }}>{itemsAmount}</span>
        </h2>
        <div className='order_buttons'>
          {!isDelivered ? (
            <button className='delivered_button' title='Change Status' onClick={() => setShowFinishModal(true)}>
              🚚 ✓
            </button>
          ) : (
            <span style={{ color: '#5cbdb9', marginRight: '20px', fontSize: '36px' }}>✓</span>
          )}
          <button title='Delete Order' className='delete_order_button' onClick={() => setShowDeletingModal(true)} />
        </div>
      </div>
      <div className='order_info'>
        <div className='order_dates'>
          <h3 className='order_placed_date'>
            Order Placed: <span style={{ opacity: 0.6, marginLeft: '9px' }}>{formattedOrderPlacedDate}</span>
          </h3>
          <h3 className='order_delivery_date'>
            Delivery Date: <span style={{ opacity: 0.6 }}>{formateedDeliveryDate}</span>
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
            const itemPrice = (amount * price).toFixed(1);
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
                  <h3 className='product_items_price'>$ {itemPrice}</h3>
                </div>
                <hr className='product_line_separator' />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        title={deletingModalTitle}
        showModal={showDeletingModal}
        onYes={() => deleteOrderHandler(id)}
        onNo={() => setShowDeletingModal(false)}
      />
      <Modal
        title='You are about to change the status of the order to: (Delivered)'
        showModal={showFinishModal}
        onYes={() => finishOrderHandler(id)}
        onNo={() => setShowFinishModal(false)}
      />
    </div>
  );
};
