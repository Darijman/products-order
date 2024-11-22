'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../../../stores/useCartStore/useCartStore';
import { useProductsStore } from '../../../stores/useProductsStore/useProductsStore';
import { usePathname } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '../../../fixtures/categories';
import Link from 'next/link';
import './mobileHeader.css';

export const MobileHeader = () => {
  const { setShowCart, cartProducts } = useCartStore();
  const { setCategory } = useProductsStore();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category') || 'All';

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const categoryOnChangeHandler = (category: string) => {
    if (category === 'All') {
      router.push(`/products`);
    } else {
      router.push(`/products?category=${category}`);
      setCategory(category);
    }

    setShowMenu(false);
    setShowSubMenu(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
      setShowSubMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const cartItemsAmount: number = cartProducts.reduce((acc, product) => acc + product.amount, 0);

  return (
    <div className='burger_header'>
      <div ref={menuRef}>
        <div className='burger' onClick={() => setShowMenu(!showMenu)}>
          <div className='burger_lines'>
            <div className='burger_line'></div>
            <div className='burger_line'></div>
            <div className='burger_line'></div>
          </div>
          <span className='burger_title'>Products</span>
        </div>
        {showMenu && (
          <ul className='burger_list'>
            <Link href='/products' className='burger_list_link' onClick={() => setShowMenu(false)}>
              <li className='burger_list_item'>Products</li>
            </Link>
            {(pathName === '/' || pathName === '/products') && (
              <li className='burger_list_item'>
                <div className='burger_categories' onClick={() => setShowSubMenu(!showSubMenu)}>
                  Categories
                </div>
                <ul className={`burger_categories_submenu ${showSubMenu ? 'open' : ''}`}>
                  {categories.map((category, index) => (
                    <li
                      className={`burger_submenu_item ${category.category === searchCategory ? 'active' : ''}`}
                      key={index}
                      onClick={() => categoryOnChangeHandler(category.category)}
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              </li>
            )}
            <Link href='/orders' className='burger_list_link' onClick={() => setShowMenu(false)}>
              <li className='burger_list_item'>Your Orders</li>
            </Link>
          </ul>
        )}
      </div>
      <div onClick={() => setShowCart(true)} className='shopping_cart'>
        Shopping Cart {cartItemsAmount >= 1 ? `(${cartItemsAmount})` : null}
      </div>
    </div>
  );
};
