import { Inconsolata } from 'next/font/google';
import './globals.css';
import { Header } from '../ui/header/Header';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
