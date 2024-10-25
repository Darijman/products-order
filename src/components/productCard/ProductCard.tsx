'use client';

import { Product } from '../../interfaces/Product';
import Image from 'next/image';

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, price, category, amount, image } = product;

  return (
    <div className='product_background'>
      <div className='product'>
        <div className='product_image_container'>
          <Image src={image} alt={title} width={250} height={250} className='product_image' />
        </div>
        <hr />
        <div className='product_info'>
          <h2 className='product_title'>{title}</h2>
          <h2 className='product_price'>{price}$</h2>
        </div>
        <hr />
        <div>
          <p className='product_description'>{description}</p>
        </div>
        <button className='add_to_cart_button'>Add To Cart</button>
      </div>
    </div>
  );
};
