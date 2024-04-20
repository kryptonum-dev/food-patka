'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.scss';
import type { _HeaderTypes } from './Header.types';

export default function Header({ logo, links, DropdownIcon, IndicatorIcon, BackIcon }: _HeaderTypes) {
  const pathname = usePathname();
  const ariaCurrent = (href: string) => pathname === href ? 'page' : false;
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState('');

  const handleTab = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (window.innerWidth <= 999) e.preventDefault();
    setTab(href);
  };

  const handleEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape') && setOpened(false);

  useEffect(() => setTab(''), [opened]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  });

  return (
    <>
      <header
        className={styles['Header']}
        aria-expanded={opened}
      >
        <div className={`${styles.maxWidth} max-width`}>
          <Link
            href='/'
            aria-label="Strona główna"
            className={styles.logo}
            onClick={() => setOpened(false)}
          >
            {logo}
          </Link>
          <nav className={styles.nav}>
            <ul>
              {links.map(({ name, href, links }, i) => (
                <li
                  key={i}
                >
                  <Link
                    href={href}
                    aria-current={ariaCurrent(href)}
                    aria-expanded={tab === href}
                    onClick={(e) => {
                      if (links) {
                        handleTab(e, href);
                      } else {
                        setOpened(false);
                      }
                    }}
                  >
                    {IndicatorIcon}
                    {name}
                    {links && DropdownIcon}
                  </Link>
                  {links && (
                    <ul className={styles.dropdown}>
                      <li className={styles.dropdownBackBtn}>
                        <button onClick={() => setTab('')}>
                          {BackIcon}
                          <span>{name}</span>
                        </button>
                      </li>
                      <li className={styles.linkToMainGroup}>
                        <Link
                          href={href}
                          aria-current={ariaCurrent(href)}
                          onClick={() => setOpened(false)}
                        >
                          {IndicatorIcon}
                          Przejdź do: {name}
                        </Link>
                      </li>
                      {links.map(({ href, name, img }, i) => (
                        <li key={i}>
                          <Link
                            href={href}
                            aria-current={ariaCurrent(href)}
                            onClick={() => setOpened(false)}
                          >
                            {IndicatorIcon}
                            {img}
                            <span>{name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button className={styles.menuButton} onClick={() => setOpened(prevState => !prevState)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header >
      <div
        className={styles['Overlay']}
        role='button'
        onClick={() => setOpened(false)}
      />
    </>
  );
}