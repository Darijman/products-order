import { Categories, Product } from '../interfaces/Product';

const product1: Product = {
  id: '1',
  title: 'Banana Milk',
  price: 1.3,
  category: Categories.Food,
  amount: 1,
  image: '/img/korean-banana-milk.avif',
};

const product2: Product = {
  id: '2',
  title: 'Buldak Ramen Carbonara',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/carbonara-buldak-ramen.jpg',
};

const product3: Product = {
  id: '3',
  title: 'Buldak Ramen Cheese',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/cheese-buldak-ramen.jpg',
};

const product4: Product = {
  id: '4',
  title: 'Cola',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/cola.jpg',
};

const product5: Product = {
  id: '5',
  title: 'Pepsi',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/pepsi.jpg',
};

const product6: Product = {
  id: '6',
  title: 'Sprite',
  price: 2.5,
  category: Categories.Food,
  amount: 1,
  image: '/img/sprite.jpeg',
};

export const products: Product[] = [product1, product2, product3, product4, product5, product6];
