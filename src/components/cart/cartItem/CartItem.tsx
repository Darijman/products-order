'use client';

import Image from 'next/image';
import { Product } from '../../../interfaces/Product';
import { useCartStore } from '../../../stores/useCartStore/useCartStore';
import './cartItem.css';

export const CartItem = ({ product }: { product: Product }) => {
  const { id, title, category, amount, price, image } = product;
  const { deleteProduct, removeOneProduct, addProduct } = useCartStore();

  const itemPrice = amount * price;

  return (
    <>
      <hr />
      <div className='cart_item'>
        <Image src={image} width={100} height={100} alt={title} priority={true} />
        <div>
          <h3 className='cart_item_category'>{category}</h3>
          <h3 className='cart_item_title'>{title}</h3>
        </div>
        <div className='cart_item_amount'>
          <button className='cart_item_decrease_button' onClick={() => removeOneProduct(id)}>
            -
          </button>
          <span className='cart_item_product_amount'>{amount}</span>
          <button className='cart_item_increase_button' onClick={() => addProduct(product)}>
            +
          </button>
        </div>
        <h4 className='cart_item_price'>$ {itemPrice}</h4>
        <button onClick={() => deleteProduct(id)} className='cart_item_delete_button' title='Delete Item' />
      </div>
    </>
  );
};
