import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './Reviews.module.scss';
import ReviewScore from '@/components/ui/ReviewScore';
import type { ReviewsTypes } from './Reviews.types';

export default function Reviews({ data }: ReviewsTypes) {
  return (
    data.map(({ name, rating, content, gallery }, i) => (
      <div className={styles.item} key={i}>
        {QuoteIcon}
        <header>
          <h3>{name}</h3>
          <ReviewScore rating={rating} />
        </header>
        <Markdown>{content}</Markdown>
        {gallery && (
          <div className={styles.gallery}>
            {gallery.map((img, i) => (
              <Img data={img} sizes='96px' key={i} />
            ))}
          </div>
        )}
      </div>
    ))
  );
}

const QuoteIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={33}
    height={27}
    viewBox='0 0 33 27'
    fill='none'
    className={styles.QuoteIcon}
  >
    <path
      d='M0 23.424q4.416-3.36 6.24-6.336 1.92-3.072 1.92-6.72-1.248.768-2.88.768-2.208 0-3.648-1.44Q.288 8.16.288 5.856q0-2.592 1.728-4.224Q3.84 0 6.816 0q6.816 0 6.816 9.024 0 2.496-.576 4.512t-1.92 4.032Q9.888 19.488 7.68 21.6q-2.208 2.016-5.472 4.416zm18.432 0q4.416-3.36 6.24-6.336 1.92-3.072 1.92-6.72-1.248.768-2.88.768-2.208 0-3.648-1.44-1.344-1.536-1.344-3.84 0-2.592 1.728-4.224Q22.272 0 25.248 0q6.816 0 6.816 9.024 0 2.496-.576 4.512t-1.92 4.032q-1.248 1.92-3.456 4.032-2.208 2.016-5.472 4.416z'
      fill='#FFD7E4'
    />
  </svg>
);
