import Error from '@/components/ui/Error';
import Textarea from './_Textarea';
import styles from './Input.module.scss';
import type { InputTypes } from './Input.types';

export default function Input({ label, register, errors, textarea = false, ...props }: InputTypes) {
  const Element = textarea ? Textarea : 'input';

  return (
    <label
      className={styles['Input']}
      aria-invalid={!!errors[register.name]}
    >
      <p className={styles.label}>
        <span dangerouslySetInnerHTML={{ __html: label }} />
        <Error error={errors[register.name]?.message?.toString()} />
      </p>
      <Element
        {...register}
        name={register.name}
        {...props}
      />
    </label>
  );
}