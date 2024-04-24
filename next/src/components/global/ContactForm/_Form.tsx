'use client';
import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import FormState from '@/components/ui/FormState';
import styles from './ContactForm.module.scss';
import { REGEX } from '@/global/constants';
import type { FormStatusTypes } from '@/global/types';

export default function Form() {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    try {
      const response = await fetch('/api/contact', {
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
      <Input
        textarea={true}
        label='Twoja wiadomość'
        register={register('message', {
          required: { value: true, message: 'Wiadomość jest wymagana' },
        })}
        errors={errors}
      />
      <Checkbox
        label={
          <>
            Akceptuję warunki{' '}
            <a
              className='link'
              href='/polityka-prywatnosci'
              target='_blank'
              rel='noopener'
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
        Wyślij wiadomość
      </Button>

      <Loader loading={status.sending} />
      <FormState
        errorState={{
          heading: 'Nie udało się wysłać wiadomości',
          paragraph: <>
            Podczas przesyłania, wystąpił problem z serwerem. Wyślij wiadomość ponownie. W razie niepowodzenia, skontaktuj się z nami mailowo:&nbsp;
            <a href="mailto:patrycja@foodpatka.pl" className='link' target='_blank' rel='noreferrer'>patrycja@foodpatka.pl</a>
          </>,
        }}
        successState={{
          heading: 'Dziękujemy za kontakt',
          paragraph: 'Twoja wiadomość właśnie dotarła do naszej skrzynki mailowej. Odezwiemy się najszybciej, jak to możliwe.',
        }}
        isSuccess={status?.success}
        setStatus={setStatus}
      />
    </form>
  );
}