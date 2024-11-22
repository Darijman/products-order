import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '../../../stores/useCartStore/useCartStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductsStore } from '../../../stores/useProductsStore/useProductsStore';
import { usePathname } from 'next/navigation';
import { categories } from '../../../fixtures/categories';
import './webHeader.css';

export const WebHeader = () => {
  const { setShowCart, cartProducts } = useCartStore();
  const { setCategory } = useProductsStore();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

  const submenuRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get('category') || 'All';

  const categoryOnChangeHandler = (category: string) => {
    if (category === 'All') {
      router.push(`/products`);
      setCategory('');
    } else {
      router.push(`/products?category=${category}`);
      setCategory(category);
    }

    setIsSubmenuOpen(false);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (submenuRef.current && !submenuRef.current.contains(target)) {
      setIsSubmenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemsAmount: number = cartProducts.reduce((acc, product) => acc + product.amount, 0);

  return (
    <>
      <ul className='header_list'>
        <li className='header_list_item'>
          <Link href='/products' className='nav_link'>
            Products
          </Link>
        </li>
        {(pathName === '/' || pathName === '/products') && (
          <li>
            <div className='nav_link_caret' onClick={toggleSubmenu}>
              Categories
            </div>
            <ul ref={submenuRef} className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
              {categories.map((category, index) => (
                <li
                  className={`submenu_item ${category.category === searchCategory ? 'active' : ''}`}
                  key={index}
                  onClick={() => categoryOnChangeHandler(category.category)}
                >
                  {category.category}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <ul className='header_list'>
        <li onClick={() => setShowCart(true)} className='header_list_item shopping_cart'>
          Shopping Cart {cartItemsAmount >= 1 ? `(${cartItemsAmount})` : null}
        </li>
      </ul>
    </>
  );
};
