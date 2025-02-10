import Markdown from '@/components/ui/markdown';
import styles from './Reviews.module.scss';
import ReviewScore from '@/components/ui/ReviewScore';
import Form from './_Form';
import getLegalLink from '@/components/ui/get-legal-link';
import type { ReviewsTypes } from './Reviews.types';

export default async function Reviews({ data, productId }: ReviewsTypes) {
  return (
    <>
      <Form
        productId={productId}
        privacyPolicyLink={(await getLegalLink()).privacyPolicy}
        RatingIcon={RatingIcon}
      />
      <div className={styles.list}>
        {data?.map(({ name, rating, content }, i) => (
          <div className={styles.item} key={i}>
            {QuoteIcon}
            <header>
              <h3>{name}</h3>
              <ReviewScore rating={rating} />
            </header>
            <Markdown>{content}</Markdown>
          </div>
        ))}
      </div>
    </>
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
const RatingIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    fill='none'
  >
    <path
      d='M10.001 5.334c.934-.523 2.595-1.867 4.667-1.867a4.583 4.583 0 0 1 4.667 4.461c0 3.939-2.8 11.406-5.6 11.406-1.167 0-2.334-.99-3.734-.99s-2.566.99-3.733.99c-2.8 0-5.6-7.467-5.6-11.406a4.573 4.573 0 0 1 4.667-4.46C7.407 3.466 9.068 4.81 10 5.333Zm0 0c0-2.8-.933-4.2-1.866-4.667'
      stroke='#F489A9'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill="none"
    />
    <path d='M8.135.667C9.068 1.134 10 2.534 10 5.334Z' fill='#FFB8CE' />
  </svg>
);
