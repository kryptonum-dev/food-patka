import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import Button from '@/components/ui/Button';
import styles from './Info.module.scss';
import { PaymentIcon } from './PaymentIcon';
import type { ProductTypes } from '../Product.types';

export default function Info({
  name,
  url,
  hasVariants,
  variants,
  cheapestVariant,
  price,
  oldPrice,
  omnibus,
  currentVariantParam,
  className,
}: Omit<ProductTypes, 'gallery' | 'category' | 'description'> &
  {
    className: React.HTMLProps<HTMLElement>['className'];
  }
) {
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;
  const omnibusPrice = hasVariants ? (currentVariant?.omnibus || cheapestVariant.omnibus) : omnibus;

  return (
    <section className={`${styles['Info']} ${className}`}>
      <div className={styles.mainAction}>
        <Markdown.h1>{name}</Markdown.h1>
        {hasVariants && (
          <ul className={styles.categories}>
            {variants?.map(({ name }, i) => (
              <li key={i}>
                <Link
                  href={i + 1 == currentVariantParam ? '?' : `?v=${i + 1}`}
                  scroll={false}
                  aria-current={i + 1 == currentVariantParam ? 'page' : undefined}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.price}>
          {hasVariants ? (
            currentVariant ? (
              <>
                {currentVariant.oldPrice ? (
                  <p><del>{currentVariant.oldPrice} zł</del> {currentVariant.price} zł</p>
                ) : (
                  <p>{currentVariant.price} zł</p>
                )}
              </>
            ) : (
              <>
                {cheapestVariant.oldPrice ? (
                  <p>od <del>{cheapestVariant.oldPrice} zł</del> {cheapestVariant.price} zł</p>
                ) : (
                  <p>od {cheapestVariant.price} zł</p>
                )}
              </>
            )
          ) : (
            <p>{oldPrice && <del>{oldPrice}&nbsp;zł</del>} {price}&nbsp;zł</p>
          )}
        </div>
        <p className={styles.omnibus}>Najniższa cena z 30 dni przed obniżką: {omnibusPrice} zł</p>
        <Button href={url}>Kup teraz</Button>
        <div className={styles.paymentInfo}>
          <p>Bezpieczne płatności</p>
          <ul>
            <li><PaymentIcon.Visa /></li>
            <li><PaymentIcon.Mastercard /></li>
            <li><PaymentIcon.Przelewy24 /></li>
            <li><PaymentIcon.Blik /></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
