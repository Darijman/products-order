'use client';

import { Product } from '../../interfaces/Product';
import Image from 'next/image';
import './productCard.css';

export const ProductCard = ({ product }: { product: Product }) => {
  const { title, price, image } = product;

  return (
    <div className='product_background'>
      <div className='product'>
        <div className='product_image_container'>
          <Image src={image} alt={title} width={200} height={200} className='product_image' />
        </div>
        <hr className='line' />
        <div className='product_info'>
          <h2 className='product_title'>{title}</h2>
          <div className='product_bottom'>
            <h2 className='product_price'>${price}</h2>
            <button className='add_to_cart_button'>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
