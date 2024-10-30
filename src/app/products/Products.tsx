'use client';

import { ProductCard } from '../../components/productCard/ProductCard';
import { Categories, Product } from '../../interfaces/Product';
import { Cart } from '../../components/cart/Cart';
import './products.css';

const product: Product = {
  id: '1',
  title: 'Banana Milk',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/korean-banana-milk.avif',
};

export const Products = () => {
  return (
    <div>
      <h1 className='products_title'>Products</h1>
      <div className='cart_container'>
        <Cart />
      </div>
      <div className='products_grid'>
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
      </div>
    </div>
  );
};
