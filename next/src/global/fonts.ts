import { Libre_Baskerville as LibreBaskervilleFont, Rosario as RosarioFont } from 'next/font/google';

export const Rosario = RosarioFont({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'swap',
});

export const LibreBaskerville = LibreBaskervilleFont({
  weight: ['400', '700'],
  subsets: ['latin'],
  fallback: ['serif'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});
