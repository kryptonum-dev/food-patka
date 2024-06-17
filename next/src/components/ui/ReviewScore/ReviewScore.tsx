import styles from './ReviewScore.module.scss';
import type { ReviewScoreTypes } from './ReviewScore.types';

export default function ReviewScore({ rating, totalReviews, className }: ReviewScoreTypes) {
  if (rating == null) return;
  return (
    <div className={`${styles['ReviewScore']} ${className ? className : ''}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} filled={index < rating} />
      ))}
      <p>{rating}/5{totalReviews && <span> ({totalReviews})</span>}</p>
    </div>
  );
}

const Icon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
  >
    <path
      d='M10 16.02c1 0 1.833.707 2.667.707 2 0 4-5.334 4-8.147a3.273 3.273 0 0 0-3.334-3.187c-1.48 0-2.666.96-3.333 1.334-.667-.374-1.853-1.334-3.333-1.334A3.267 3.267 0 0 0 3.333 8.58c0 2.813 2 8.147 4 8.147.834 0 1.667-.707 2.667-.707'
      fill={filled ? '#FFB8CE' : 'none'}
    />
    <path d='M8.667 3.393C9.333 3.727 10 4.727 10 6.727z' fill='#FFB8CE' />
    <path
      d='M10 6.727c.667-.374 1.853-1.334 3.333-1.334a3.273 3.273 0 0 1 3.334 3.187c0 2.813-2 8.147-4 8.147-.834 0-1.667-.707-2.667-.707s-1.833.707-2.667.707c-2 0-4-5.334-4-8.147a3.267 3.267 0 0 1 3.334-3.187c1.48 0 2.666.96 3.333 1.334m0 0c0-2-.667-3-1.333-3.334'
      stroke='#F489A9'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
