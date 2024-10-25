'use client';

import { ProductCard } from '../../components/productCard/ProductCard';
import { Categories, Product } from '../../interfaces/Product';
import './products.css';

const product: Product = {
  id: '1',
  title: 'Banana Milk',
  price: 500,
  category: Categories.FOOD,
  amount: 0,
  image: '/img/korean-banana-milk.avif',
};

export const Products = () => {
  return (
    <div>
      <h1 className='products_title'>Products</h1>
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
