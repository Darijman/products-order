'use client';

import { Product } from '../../interfaces/Product';
import { useCartStore } from '../../stores/useCartStore/useCartStore';
import Image from 'next/image';
import './productCard.css';

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, price, image } = product;
  const { addProduct, cartProducts } = useCartStore();

  const productAdded = cartProducts.some((product) => product.id === id);

  return (
    <div className='product_background'>
      <div className='product'>
        <div className='product_image_container'>
          <Image src={image} alt={title} width={200} height={200} className='product_image' />
        </div>
        <hr className='line' />
        <div className='product_info'>
          <div className='product_top'>
            <h2 className='product_title'>{title}</h2>
            {productAdded ? <span className='product_added_mark'>✓</span> : null}
          </div>
          <div className='product_bottom'>
            <h2 className='product_price'>$ {price}</h2>
            <button className='add_to_cart_button' onClick={() => addProduct(product)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
