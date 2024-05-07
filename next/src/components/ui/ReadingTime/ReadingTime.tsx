import styles from './ReadingTime.module.scss';
import type { ReadingTimeTypes } from './ReadingTime.types';

const readingTime = (text: string) => {
  const countWords = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText === '') return 0;
    const words = trimmedText.split(/\s+/);
    return words.length;
  };
  const words = countWords(text);
  const averageReadingSpeedWordsPerMinute = 200;
  const readingTime = Math.ceil(words / averageReadingSpeedWordsPerMinute);
  return readingTime;
};

export default function ReadingTime({ content }: ReadingTimeTypes) {
  return (
    <p className={styles['ReadingTime']}>
      <ClockIcon />
      <span>{readingTime(content)} min. czytania</span>
    </p>
  );
}

const ClockIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={21}
    height={20}
    viewBox='0 0 21 20'
    fill='none'
  >
    <path
      d='M10.5 5v5h3.75m4.583 0a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z'
      stroke='#FFB8CE'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);