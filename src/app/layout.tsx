import { Inconsolata } from 'next/font/google';
import './globals.css';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inconsolata.className}>{children}</body>
    </html>
  );
}
