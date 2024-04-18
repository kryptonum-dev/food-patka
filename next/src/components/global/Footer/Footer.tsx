import Link from 'next/link';
import sanityFetch from '@/utils/sanity.fetch';
import Newsletter from './Newsletter';
import styles from './Footer.module.scss';
import Button from '@/components/ui/Button';
import type { FooterQueryTypes } from './Footer.types';

export default async function Footer() {
  const { footer } = await query();

  return (
    <>
      <WaveSvg className={styles.WaveSvg} />
      <footer className={styles['Footer']}>
        <div className='max-width'>
          <Newsletter data={footer} />
          <div className={styles.info}>
            <p className={styles.copyright}>
              <span>Ⓒ Stworzone przez </span>
              <a href="https://kryptonum.eu/pl" className="link" target='_blank' rel='noreferrer'>Kryptonum</a>
            </p>
            <div className={styles.legal}>
              <Link href='/polityka-prywatnosci' className='link'>Polityka prywatności</Link>
              <Link href='reglulamin' className='link'>Regulamin</Link>
              <button className="link">Zarządzaj ciasteczkami</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


const query = async (): Promise<FooterQueryTypes> => {
  return await sanityFetch<FooterQueryTypes>({
    query: /* groq */ `
      *[_id == 'global'][0] {
        footer {
          heading,
          paragraph,
        },
      }
    `,
    tags: ['global'],
  });
};

const WaveSvg = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    viewBox='0 0 1366 175'
    fill="none"
    {...props}
  >
    <path
      d="M263 40.28c-111.341 57.812-207.333 98-262 78l-1 56h1365l1-8c-123-179-342-77-455-56-75.901 14.106-170-4-232-48s-260-103-416-22Z"
      fill="#FFF6F9"
    />
  </svg>
)