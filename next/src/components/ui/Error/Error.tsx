'use client';
import styles from './Error.module.scss';
import type { ErrorTypes } from './Error.types';

export default function Error({ error }: ErrorTypes) {
  return (
    error && (
      <span
        className={styles['Error']}
        role='alert'
      >
        <ErrorIcon />
        <span>{error}</span>
      </span>
    )
  );
}

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
  >
    <path
      d="M8.5 15.3a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z"
      fill="#FFEAEA"
    />
    <path
      d="M8.5 5.966v2.667m0 2.667h.007m6.66-2.667a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
      stroke="#CB2F2F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
