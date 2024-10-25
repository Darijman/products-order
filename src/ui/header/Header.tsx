'use client';

import './header.css';

const categories: { id: string; category: string }[] = [
  { id: '1', category: 'FOOD' },
  { id: '2', category: 'HOUSE' },
  { id: '3', category: 'SPORT' },
  { id: '4', category: 'CLOTHES' },
  { id: '5', category: 'FURNITURE' },
  { id: '6', category: 'BOOKS' },
  { id: '7', category: 'CHILDREN' },
];

export const Header = () => {
  return (
    <div className='header_background'>
      <header className='header'>
        <nav className='header_nav'>
          <ul className='header_list'>
            <li className='header_list_item'>
              <a href='/' className='nav_link'>
                Products Order
              </a>
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
            <li className='header_list_item'>
              <a href='/' className='nav_link'>
                Home
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
