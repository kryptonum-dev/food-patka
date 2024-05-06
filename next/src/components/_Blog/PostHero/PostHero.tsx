import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './PostHero.module.scss';
import { dateFormat } from '@/utils/date-format';
import type { PostHeroTypes } from './PostHero.types';

export default function PostHero({ title, subtitle, img, _createdAt, category }: PostHeroTypes) {
  return (
    <section className={styles['PostHero']}>
      <header>
        <Link
          href={`/blog/kategoria/${category.slug}`}
          className={styles.category}
        >
          {category.name}
        </Link>
        <Markdown.h1>{title}</Markdown.h1>
        <Markdown>{subtitle}</Markdown>
        <div className={styles.info}>
          <p>{dateFormat(_createdAt)}</p>
        </div>
      </header>
      <div className={styles.img}>
        <Img
          data={img}
          sizes='(max-width: 937px) 100vw, 857px'
          priority={true}
        />
        <ArrowIcon className={styles.ArrowIcon} />
      </div>
    </section>
  );
}

const ArrowIcon = ({ ...props }) => (
  <svg
    width={220}
    height={309}
    viewBox='0 0 220 309'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M2 8.603C59.697-15.855 136.145 30.72 143.553 97.464m0 0c1.703 15.345-.242 31.755-6.904 48.613-42.029 106.366-77.26-67.07 6.904-48.613Zm0 0c5.039 1.105 10.506 2.898 16.425 5.48 104.783 45.707 52.877 167.105-34.954 198.372'
      stroke='#FFD7E4'
      strokeWidth={3}
      strokeLinecap='round'
    />
    <path
      d='m130 289.5-6 12 12 6'
      stroke='#FFD7E4'
      strokeWidth={3}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);