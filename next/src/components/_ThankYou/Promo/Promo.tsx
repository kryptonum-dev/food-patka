import Markdown from '@/components/ui/markdown';
import Button from '@/components/ui/Button';
import styles from './Promo.module.scss';
import type { PromoTypes } from './Promo.types';

export default function Promo({ heading, paragraph, cta, expiry }: PromoTypes) {
  return (
    <section className={styles['Promo']}>
      <Markdown.h2>{heading}</Markdown.h2>
      <Markdown>{paragraph}</Markdown>
      {cta && <Button data={cta} />}
      {expiry && <p>{expiry}</p>}
    </section>
  );
}
