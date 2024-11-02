'use client';

import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductsStore } from '../../stores/useProductsStore/useProductsStore';
import Link from 'next/link';
import './header.css';

const categories: { id: string; category: string }[] = [
  { id: '0', category: 'All' },
  { id: '1', category: 'Food' },
  { id: '2', category: 'House' },
  { id: '3', category: 'Sport' },
  { id: '4', category: 'Clothes' },
  { id: '5', category: 'Furniture' },
  { id: '6', category: 'Books' },
  { id: '7', category: 'Children' },
];

export const Header = () => {
  const { setShowCart, cartProducts } = useCartStore();
  const { setCategory } = useProductsStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category') || 'All';

  const cartItemsAmount: number = cartProducts.reduce((acc, product) => acc + product.amount, 0);

  const categoryOnChangeHandler = (category: string) => {
    if (category === 'All') return router.push(`/products`);
    router.push(`/products?category=${category}`);
    setCategory(category);
  };

  return (
    <div className='header_background'>
      <header className='header'>
        <nav className='header_nav'>
          <ul className='header_list'>
            <li className='header_list_item'>
              <Link href='/products' className='nav_link'>
                Products Order
              </Link>
            </li>
            <li className='header_list_item'>
              <div className='nav_link_caret'>Categories</div>
              <ul className='submenu'>
                {categories.map((category, index) => {
                  return (
                    <li
                      className={`submenu_item ${category.category === searchCategory ? `active` : ``}`}
                      key={index}
                      onClick={() => categoryOnChangeHandler(category.category)}
                    >
                      {category.category}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <ul className='header_list'>
            <li onClick={() => setShowCart(true)} className='header_list_item shopping_cart'>
              Shopping Cart {cartItemsAmount >= 1 ? `(${cartItemsAmount})` : null}
            </li>
            <li className='header_list_item'>
              <Link href='/' className='nav_link'>
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
