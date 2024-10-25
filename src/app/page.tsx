'use client';

import { ProductCard } from '../components/productCard/ProductCard';
import { Product } from '../interfaces/Product';
import { Categories } from '../interfaces/Product';
import { Header } from '../ui/header/Header';

const product: Product = {
  id: '1',
  title: 'Banana Milk',
  description: 'Famous korean banan milk. Suits to every meal!',
  price: 500,
  category: Categories.FOOD,
  amount: 0,
  image: '/img/banana-milk.jpg',
};

export default function Home() {
  return (
    <div>
      <Header />
      {/* <ProductCard product={product} /> */}
      {/* <h1>Lorem ipsum dolor sit amet.</h1>
      <h2>Lorem ipsum dolor sit amet.</h2>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <h4>Lorem ipsum dolor sit amet.</h4>
      <h5>Lorem ipsum dolor sit amet.</h5>
      <h6>Lorem ipsum dolor sit amet.</h6> */}
    </div>
  );
}
