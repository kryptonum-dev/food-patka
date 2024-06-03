import '@/global/global.scss';
import { LOCALE, THEME_COLOR } from '@/global/constants';
import { LibreBaskerville, Rosario } from '@/global/fonts';
import { GoogleTagManager } from '@next/third-parties/google';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import CookieConsent from '@/components/global/CookieConsent';

export const viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={LOCALE}>
      <body className={`${Rosario.className} ${LibreBaskerville.variable}`}>
        <Header />
        <main id='main'>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
      {/* {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId='GTM-KNPVL7L7' />} */}
      <GoogleTagManager gtmId='GTM-KNPVL7L7' />
    </html>
  );
}
