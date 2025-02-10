import Script from 'next/script';
import styles from './CookieConsent.module.scss';
import Content from './_Content';
import getLegalLink from '@/components/ui/get-legal-link';

export default async function CookieConsent() {
  return (
    <>
      <Script id='gtag'>{'window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}'}</Script>
      <aside className={styles['CookieConsent']}>
        <Content
          CloseIcon={CloseIcon}
          privacyPolicyLink={(await getLegalLink()).privacyPolicy} />
      </aside>
    </>
  );
}

const CloseIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
  >
    <path
      d='M10 18.833a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666'
      fill='#FFF6F9'
    />
    <path
      d='m12.5 8-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0'
      stroke='#F489A9'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
