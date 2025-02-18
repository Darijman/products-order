import { Inconsolata } from 'next/font/google';
import { Header } from '../ui/header/Header';
import { Cart } from '../components/cart/Cart';
import './globals.css';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export const metadata = {
  title: 'Products-Order',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inconsolata.className}>
        <Header />
        <main>
          <Cart />
          {children}
        </main>
      </body>
    </html>
  );
}
