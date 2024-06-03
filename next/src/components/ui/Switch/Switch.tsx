'use client';
import styles from './Switch.module.scss';
import type { SwitchTypes } from './Switch.types';

const Switch = ({ children, labelProps, inputProps }: SwitchTypes) => {
  return (
    <label
      {...labelProps}
      className={`${styles['Switch']} ${labelProps?.className || ''}`}
    >
      <div className={styles.switcher}>
        <input
          type='checkbox'
          {...inputProps}
        />
        <div className={styles.dot}>
          <Tick className={styles.tick} />
        </div>
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Switch;

const Tick = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      d='M13.333 4 6 11.333 2.667 8'
      stroke='#F489A9'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
