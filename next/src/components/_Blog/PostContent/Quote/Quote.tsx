import Markdown from '@/components/ui/markdown';
import styles from './Quote.module.scss';
import type { QuoteTypes } from './Quote.types';

export default function Quote({ content, author }: QuoteTypes) {
  return (
    <blockquote className={styles['Quote']}>
      <Markdown className={styles.content}>{content}</Markdown>
      <div className={styles.author}>
        <AuthorIcon />
        <Markdown>{author}</Markdown>
      </div>
      <QuoteIcon className={styles.QuoteIcon} />
    </blockquote>
  );
}

const QuoteIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={33}
    height={27}
    viewBox='0 0 33 27'
    fill='none'
    {...props}
  >
    <path
      d='M0 23.424q4.416-3.36 6.24-6.336 1.92-3.072 1.92-6.72-1.248.768-2.88.768-2.208 0-3.648-1.44Q.288 8.16.288 5.856q0-2.592 1.728-4.224Q3.84 0 6.816 0q6.816 0 6.816 9.024 0 2.496-.576 4.512t-1.92 4.032Q9.888 19.488 7.68 21.6q-2.208 2.016-5.472 4.416zm18.432 0q4.416-3.36 6.24-6.336 1.92-3.072 1.92-6.72-1.248.768-2.88.768-2.208 0-3.648-1.44-1.344-1.536-1.344-3.84 0-2.592 1.728-4.224Q22.272 0 25.248 0q6.816 0 6.816 9.024 0 2.496-.576 4.512t-1.92 4.032q-1.248 1.92-3.456 4.032-2.208 2.016-5.472 4.416z'
      fill='#FFB8CE'
    />
  </svg>
);

const AuthorIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={16}
    viewBox='0 0 12 16'
    fill='none'
  >
    <path
      clipRule='evenodd'
      d='M7.025 14.65c.058-2.185-.832-4.365-2.782-5.68-.756-.51-1.65-.695-2.532-.85 3.58-.122 4.823-3.87 5.321-6.77C6.86 3.95 8.22 6.762 11 7.02c-2.768 1.628-3.717 4.615-3.975 7.63'
      stroke='#F489A9'
      strokeWidth={1.5}
      strokeMiterlimit={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);