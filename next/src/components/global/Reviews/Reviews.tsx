import Markdown from '@/components/ui/markdown';
import styles from './Reviews.module.scss';
import Slider from './_Slider';
import { removeMarkdown } from '@/utils/remove-markdown';
import type { ReviewsTypes } from './Reviews.types';

export default function Reviews({ index, heading, paragraph, list }: ReviewsTypes) {
  const Heading = index === 0 ? Markdown.h1 : Markdown.h2;
  const _list = list.map(({ name, rating, productName, productSlug, content }) => ({
    name,
    rating,
    productName: removeMarkdown(productName),
    productSlug,
    content: <Markdown>{content}</Markdown>,
  }));

  return (
    <section className={styles['Reviews']}>
      <header>
        <Heading className={styles.heading}>{heading}</Heading>
        <Markdown>{paragraph}</Markdown>
      </header>
      <Slider
        list={_list}
        QuoteIcon={QuoteIcon}
        LeftArrowIcon={LeftArrowIcon}
        RightArrowIcon={RightArrowIcon}
        PaginationIcon={PaginationIcon}
      />
    </section>
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
const LeftArrowIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M5.56 12.687h-.15l.107.107 5.47 5.47a.686.686 0 0 1-.223 1.122.69.69 0 0 1-.75-.15l-6.75-6.75a.686.686 0 0 1 0-.973l6.75-6.75a.688.688 0 1 1 .973.973l-5.47 5.47-.107.106h14.84a.688.688 0 0 1 0 1.375z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
const RightArrowIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M18.44 12.687h.15l-.107.107-5.47 5.47a.686.686 0 0 0 .223 1.122.69.69 0 0 0 .75-.15l6.75-6.75a.687.687 0 0 0 0-.973l-6.75-6.75a.688.688 0 1 0-.973.973l5.47 5.47.107.106H3.75a.688.688 0 0 0 0 1.375z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
const PaginationIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={9}
    height={8}
    viewBox='0 0 9 8'
    fill='none'
  >
    <path
      d='M4.5 8a1.21 1.21 0 0 1-1.206-1.089A1.212 1.212 0 0 1 1.59 5.206a1.212 1.212 0 0 1 0-2.412A1.212 1.212 0 0 1 3.294 1.09a1.212 1.212 0 0 1 2.412 0A1.212 1.212 0 0 1 7.41 2.794a1.212 1.212 0 0 1 0 2.412A1.212 1.212 0 0 1 5.706 6.91 1.21 1.21 0 0 1 4.5 8'
      fill='#F489A9'
    />
  </svg>
);
