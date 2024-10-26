'use client';

import Image from 'next/image';
import { Product } from '../../../interfaces/Product';
import './cartItem.css';

export const CartItem = ({ product }: { product: Product }) => {
  const { title, category, amount, price, image } = product;

  return (
    <>
      <div className='cart_item'>
        <Image src={image} width={100} height={100} alt={title} />
        <div>
          <h3 className='cart_item_category'>{category}</h3>
          <h3 className='cart_item_title'>{title}</h3>
        </div>
        <div className='cart_item_amount'>
          <button className='cart_item_decrease_button'>-</button>
          <span className='cart_item_product_amount'>{amount}</span>
          <button className='cart_item_increase_button'>+</button>
        </div>
        <h4 className='cart_item_price'>$ {price}</h4>
        <button className='cart_item_delete_button' title='Delete Item' />
      </div>
      <hr />
    </>
  );
};
