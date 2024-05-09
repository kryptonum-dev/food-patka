import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './PostHero.module.scss';
import { dateFormat } from '@/utils/date-format';
import ReadingTime from '@/components/ui/ReadingTime';
import type { PostHeroTypes } from './PostHero.types';

export default function PostHero({ title, subtitle, img, _createdAt, category, readingTimeContent }: PostHeroTypes) {
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
          <ReadingTime content={readingTimeContent} />
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
      d='M2 8.603c70.962-30.08 170.286 47.287 134.649 137.474-44.545 112.734-81.454-88.84 23.329-43.133 104.783 45.707 52.877 167.105-34.954 198.372'
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