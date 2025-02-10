'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CookieConsent.module.scss';
import Button from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';
import { getCookie } from '@/utils/get-cookie';
import { setCookie } from '@/utils/set-cookie';
import type { ContentProps } from './CookieConsent.types';

type Consent = {
  necessary: boolean;
  marketing: boolean;
  analytics: boolean;
  preferences: boolean;
};

function setConsent(consent: Consent) {
  const consentMode = {
    functionality_storage: consent.necessary ? 'granted' : 'denied',
    security_storage: consent.necessary ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    personalization_storage: consent.preferences ? 'granted' : 'denied',
  } as const;
  gtag('consent', 'update', consentMode);
  setCookie('cookie-consent', JSON.stringify(consentMode), 365);
}

export default function Content({ CloseIcon, privacyPolicyLink }: ContentProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (getCookie('cookie-consent') === null) {
      gtag('consent', 'default', {
        functionality_storage: 'denied',
        security_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        personalization_storage: 'denied',
      });
      setShowBanner(true);
    } else {
      gtag('consent', 'default', JSON.parse(getCookie('cookie-consent')!));
    }
  }, []);

  const acceptAll = () => {
    setConsent({
      necessary: true,
      marketing: true,
      analytics: true,
      preferences: true,
    });
    setShowBanner(false);
  };

  const rejectAll = () => {
    setConsent({
      necessary: false,
      marketing: false,
      analytics: false,
      preferences: false,
    });
    setShowBanner(false);
  };

  const acceptPart = () => {
    setShowBanner(false);
    setConsent({
      necessary: true,
      preferences: wrapper.current?.querySelector<HTMLInputElement>('input[id="preferences"]')?.checked || false,
      analytics: wrapper.current?.querySelector<HTMLInputElement>('input[id="analytics"]')?.checked || false,
      marketing: wrapper.current?.querySelector<HTMLInputElement>('input[id="marketing"]')?.checked || false,
    });
  };

  return (
    <div
      className={styles['Content']}
      aria-hidden={!showBanner}
      ref={wrapper}
    >
      <button
        className={styles.RejectAll}
        onClick={rejectAll}
      >
        <span>Nie chcę ciasteczek</span>
        {CloseIcon}
      </button>
      <header>
        <h2><strong>Ciasteczko</strong> do kawki?</h2>
        <p className={styles.paragraph}>Dzięki nim nasza strona jest dla Ciebie bardziej przyjazna i działa niezawodnie. Ciasteczka pozwalają również dopasować treści i reklamy do Twoich zainteresowań. Dowiedz się więcej w <a href={privacyPolicyLink} target='_blank' rel='noreferrer' className='link'>polityce prywatności</a></p>
      </header>
      <div
        className={styles.settings}
        style={{ display: showSettings ? undefined : 'none' }}
        data-visible={showSettings}
      >
        <div className={styles.header}>
          <h3>Ustawienia ciasteczek</h3>
          <p className={styles.paragraph}>Poniżej możesz sprawdzić, jakie dane zbieramy w ciasteczkach i po co je zbieramy. Nie na wszystkie musisz się zgodzić. Zawsze możesz zmienić swój wybór na stronie ciasteczek. Dowiedz się więcej w <a href={privacyPolicyLink} target='_blank' rel='noreferrer' className='link'>polityce prywatności</a></p>
        </div>
        <div className={styles.group}>
          <Switch
            inputProps={{
              checked: true,
              disabled: true,
            }}
          >
            Niezbędne
          </Switch>
          <p className={styles.description}>Niezbędne pliki cookie przyczyniają się do użyteczności strony poprzez umożliwianie podstawowych funkcji, takich jak nawigacja na stronie i dostęp do bezpiecznych obszarów strony internetowej. Strona www nie może funkcjonować poprawnie bez tych ciasteczek.</p>
        </div>
        <div className={styles.group}>
          <Switch
            inputProps={{
              id: 'preferences'
            }}
          >
            Preferencje
          </Switch>
          <p className={styles.description}>Pliki cookie dotyczące preferencji umożliwiają stronie zapamiętanie informacji, które zmieniają wygląd lub funkcjonowanie strony, np. preferowany język lub region, w którym znajduje się użytkownik.</p>
        </div>
        <div className={styles.group}>
          <Switch
            inputProps={{
              id: 'analytics'
            }}
          >
            Analityczne
          </Switch>
          <p className={styles.description}>Analityczne pliki cookie pomagają właścicielom stron internetowych zrozumieć, w jaki sposób różni użytkownicy zachowują się na stronie, gromadząc i zgłaszając anonimowe informacje.</p>
        </div>
        <div className={styles.group}>
          <Switch
            inputProps={{
              id: 'marketing'
            }}
          >
            Marketing
          </Switch>
          <p className={styles.description}>Marketingowe pliki cookie stosowane są w celu śledzenia użytkowników na stronach internetowych. Ich celem jest wyświetlanie reklam, które są istotne i interesujące dla poszczególnych użytkowników i tym samym bardziej cenne dla wydawców oraz reklamodawców strony trzeciej.</p>
        </div>
      </div>
      <div className={styles.controls}>
        {showSettings ? (
          <button
            className={styles.button}
            onClick={acceptPart}
          >
            Zapisz
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => setShowSettings(true)}
          >
            Ustawienia
          </button>
        )}
        <Button onClick={acceptAll}>Zaakceptuj wszystkie</Button>
      </div>
    </div>
  );
}
