'use client';

import './header.css';
import { MobileHeader } from './mobileHeader/MobileHeader';
import { WebHeader } from './webHeader/WebHeader';

export const Header = () => {
  return (
    <div className='header_background'>
      <header className='header'>
        <nav className='header_nav'>
          <WebHeader />
          <MobileHeader />
        </nav>
      </header>
    </div>
  );
};
