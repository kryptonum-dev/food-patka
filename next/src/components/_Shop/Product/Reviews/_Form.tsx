'use client';
import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Error from '@/components/ui/Error';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { REGEX } from '@/global/constants';
import styles from './Reviews.module.scss';
import Loader from '@/components/ui/Loader';
import FormState from '@/components/ui/FormState';
import type { FormStatusTypes } from '@/global/types';
import type { FormTypes, StarageReviesTypes } from './Reviews.types';

const formStateData = {
  errorState: {
    heading: 'Nie udało się dodać opinii',
    paragraph: (
      <>
        Podczas przesyłania informacji pojawił się problem z serwerem. Jeśli problem się powtórzy, skontaktuj się ze mną przez formularz kontaktowy lub napisz na adres:&nbsp;
        <a href="mailto:patrycja@foodpatka.pl" className='link' target='_blank' rel='noreferrer'>patrycja@foodpatka.pl</a>
      </>
    ),
  },
  successState: {
    heading: 'Dziękuję za dodanie opinii!',
    paragraph: 'Dziękuję za wkład w rozwój mojego sklepu. Twoja opinia powinna pojawić się publicznie wkrótce.',
  },
};

export default function Form({ productId, privacyPolicyLink, RatingIcon }: FormTypes) {
  const [status, setStatus] = useState<FormStatusTypes>({ sending: false, success: undefined });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]') as StarageReviesTypes;
  const reviewForProduct = reviews.find(({ id }) => id === productId);
  if (reviewForProduct) {
    if (reviewForProduct.timestamp < Date.now() - (60 * 60 * 1000 * .1)) {
      localStorage.setItem('reviews', JSON.stringify(reviews.filter(({ id }) => id !== productId)));
    }
    return (
      <form className={styles['Form']}>
        <Loader loading={false} />
        <FormState
          {...formStateData}
          isSuccess={true}
          setStatus={setStatus}
        />
      </form>
    );
  }

  const onSubmit = async (data: FieldValues) => {
    setStatus({ sending: true, success: undefined });
    data.rating = parseInt(data.rating);
    data.productId = productId;
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setStatus({ sending: false, success: true });
        localStorage.setItem('reviews', JSON.stringify([...reviews, { id: productId, timestamp: Date.now() }]));
        reset();
      } else {
        setStatus({ sending: false, success: false });
      }
    } catch {
      setStatus({ sending: false, success: false });
    }
  };

  const RateElement = ({ value }: { value: number; }) => (
    <label aria-label={`Oceń na ${value} gwiazdek`}>
      <input
        type="radio"
        value={value}
        {...register('rating', {
          required: { value: true, message: 'Ocena jest wymagana' },
        })}
      />
      {RatingIcon}
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['Form']}
    >
      <h2 className='h3'><strong>Twoja</strong> ocena</h2>
      <div className={styles.rating}>
        <p>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          /5
        </p>
        <RateElement value={5} />
        <RateElement value={4} />
        <RateElement value={3} />
        <RateElement value={2} />
        <RateElement value={1} />
        <Error error={errors['rating']?.message?.toString()} />
      </div>
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
        textarea={true}
        label='Twoja opinia'
        register={register('review', {
          required: { value: true, message: 'Opinia jest wymagana' },
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
        Dodaj opinię
      </Button>

      <Loader loading={status.sending} />
      <FormState
        {...formStateData}
        isSuccess={status?.success}
        setStatus={setStatus}
      />
    </form>
  );
}