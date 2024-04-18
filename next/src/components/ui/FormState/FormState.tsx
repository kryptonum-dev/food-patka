
import Button from '@/components/ui/Button';
import styles from './FormState.module.scss';
import type { FormStateTypes } from './FormState.types';

export default function FormState({ errorState, successState, isSuccess, setStatus }: FormStateTypes) {
  return (
    isSuccess !== undefined && (
      <div
        className={styles['FormState']}
        data-issuccess={!!isSuccess}
      >
        <h3>
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
          <span>{isSuccess ? successState.heading : errorState.heading}</span>
        </h3>
        <p dangerouslySetInnerHTML={{ __html: isSuccess ? successState.paragraph : errorState.paragraph }} />
        {isSuccess === false && (
          <>
            <Button
              type='button'
              onClick={() => setStatus({ sending: false, success: undefined })}
            >
              Spróbuj ponownie
            </Button>
          </>
        )}
      </div>
    )
  );
}

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
  >
    <path
      d="M12.5 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
      fill="#FFEAEA"
    />
    <path
      d="M12.5 8v4m0 4h.01m9.99-4c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
      stroke="#CB2F2F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
  >
    <path
      d="M12.5 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
      fill="#F2FFF5"
    />
    <path
      d="m9.5 12 2 2 4-4m7 2c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
      stroke="#298543"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);