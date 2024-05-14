'use client';
import { useState } from 'react';
import { useForm, type FieldValues, } from 'react-hook-form';
import styles from './Newsletter.module.scss';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Loader from '@/components/ui/Loader';
import FormState from '@/components/ui/FormState';
import { REGEX } from '@/global/constants';
import type { FormStatusTypes } from '@/global/types';
import type { FormTypes } from './Newsletter.types';

export default function Form({ privacyPolicyLink }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    data.groupID = 'test';
    try {
      const response = await fetch('/api/mailerlite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setStatus({ sending: false, success: true });
        reset();
      } else {
        setStatus({ sending: false, success: false });
      }
    } catch {
      setStatus({ sending: false, success: false });
    }
  };

  return (
    <form
      className={styles['Form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label='Imię'
        register={register('name', {
          required: { value: true, message: 'Imię jest wymagane' },
          minLength: { value: 2, message: 'Imię jest za krótkie' },
          pattern: { value: REGEX.string, message: 'Imię jest wymagane' },
        })}
        errors={errors}
      />
      <Input
        label='E-mail'
        type='email'
        register={register('email', {
          required: { value: true, message: 'E-mail jest wymagany' },
          pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
        })}
        errors={errors}
      />
      <Checkbox
        label={
          <>
            Akceptuję warunki{' '}
            <a
              className='link'
              href={privacyPolicyLink}
              target='_blank'
              rel='noreferrer'
            >
              polityki prywatności
            </a>
          </>
        }
        register={register('legal', {
          required: { value: true, message: 'Zgoda jest wymagana' },
        })}
        errors={errors}
      />
      <Button
        type='submit'
        className={styles.cta}
        disabled={status?.sending}
      >
        Zapisz się
      </Button>

      <Loader loading={status.sending} />
      <FormState
        errorState={{
          heading: 'Nie udało się zapisać do newslettera',
          paragraph: <>
            Podczas przesyłania informacji pojawił się problem z serwerem. Jeśli problem się powtórzy, skontaktuj się z nami przez formularz kontaktowy lub napisz na adres:&nbsp;
            <a href="mailto:patrycja@foodpatka.pl" className='link' target='_blank' rel='noreferrer'>patrycja@foodpatka.pl</a>
          </>,
        }}
        successState={{
          heading: 'Dziękujemy za zapis do newslettera!',
          paragraph: 'Od teraz będziesz na bieżąco z nowościami i aktualnościami ze świata FoodPatki!',
        }}
        isSuccess={status?.success}
        setStatus={setStatus}
      />
    </form >
  );
}