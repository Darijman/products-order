import { Inconsolata } from 'next/font/google';
import './globals.css';
import { Header } from '../ui/header/Header';
import { Cart } from '../components/cart/Cart';

const inconsolata = Inconsolata({ subsets: ['latin'] });

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
