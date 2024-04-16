import '@/global/global.scss';
import { LOCALE, THEME_COLOR } from '@/global/constants';
import { LibreBaskerville, Rosario } from '@/global/fonts';
import Header from '@/components/global/Header';

export const viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={LOCALE}>
      <body className={`${Rosario.className} ${LibreBaskerville.variable}`}>
        <Header />
        <main id='main'>{children}</main>
      </body>
    </html>
  );
}
