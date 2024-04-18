import Error from '@/components/ui/Error';
import styles from './Checkbox.module.scss';
import type { CheckboxTypes } from './Checkbox.types';

export default function Checkbox({ label, register, errors, ...props }: CheckboxTypes) {
  return (
    <label
      className={styles['Checkbox']}
      aria-invalid={!!errors[register.name]}
    >
      <div className={styles.icon}>
        <input
          {...register}
          name={register.name}
          type='checkbox'
          {...props}
        />
        <CheckmarkIcon />
      </div>
      <p>
        {label}
        <Error error={errors[register.name]?.message?.toString()} />
      </p>
    </label>
  );
};

const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={7}
    fill="none"
  >
    <path
      d="M.688 2.938 3.25 5.594 7.969.687"
      stroke="#726378"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
