'use client';

import './header.css';
import Link from 'next/link';

const categories: { id: string; category: string }[] = [
  { id: '1', category: 'Food' },
  { id: '2', category: 'House' },
  { id: '3', category: 'Sport' },
  { id: '4', category: 'Clothes' },
  { id: '5', category: 'Furniture' },
  { id: '6', category: 'Books' },
  { id: '7', category: 'Children' },
];

export const Header = () => {
  return (
    <div className='header_background'>
      <header className='header'>
        <nav className='header_nav'>
          <ul className='header_list'>
            <li className='header_list_item'>
              <Link href='/' className='nav_link'>
                Products Order
              </Link>
            </li>
            <li className='header_list_item'>
              <div className='nav_link_caret'>
                <a href='/' className='nav_link'>
                  Categories
                </a>
              </div>
              <ul className='submenu'>
                {categories.map((category, index) => {
                  return (
                    <li className='submenu_item' key={index}>
                      <a href='/' className='submenu_link'>
                        {category.category}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <ul className='header_list'>
            <li className='header_list_item shopping_cart'>Shopping Cart</li>
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
