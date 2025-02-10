import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import styles from './Info.module.scss';
import { PaymentIcon } from './PaymentIcon';
import BuyButton from '@/components/ui/BuyButton';
import ReviewScore from '@/components/ui/ReviewScore';
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
  content_id,
  content_name,
  rating,
  totalReviews,
  searchParams
}: Omit<ProductTypes, '_id' | 'gallery' | 'category' | 'description' | 'reviews' | 'numberOfRecentPurchases'> &
  { className: React.HTMLProps<HTMLElement>['className'] }
) {
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;
  const omnibusPrice = hasVariants ? (currentVariant?.omnibus || cheapestVariant.omnibus) : omnibus;
  const purchase_url = currentVariant?.url || url;

  return (
    <section className={`${styles['Info']} ${className}`}>
      <ReviewScore rating={rating} totalReviews={totalReviews} />
      <Markdown.h1>{name}</Markdown.h1>
      {hasVariants && (
        <ul className={styles.categories}>
          {variants?.map(({ name }, i) => (
            <li key={i}>
              <Link
                href={{
                  pathname: url,
                  query: {
                    ...searchParams,
                    v: i + 1
                  }
                }}
                scroll={false}
                aria-current={i + 1 == currentVariantParam ? 'page' : undefined}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {hasVariants ? (
        currentVariant ? (
          <>
            {currentVariant.oldPrice ? (
              <p className={`${styles.price} special-price`}><del>{currentVariant.oldPrice} zł</del> {currentVariant.price} zł</p>
            ) : (
              <p className={`${styles.price} price`}>{currentVariant.price} zł</p>
            )}
          </>
        ) : (
          <>
            {cheapestVariant.oldPrice ? (
              <p className={`${styles.price} special-price`}>od <del>{cheapestVariant.oldPrice} zł</del> {cheapestVariant.price} zł</p>
            ) : (
              <p className={`${styles.price} price`}>od {cheapestVariant.price} zł</p>
            )}
          </>
        )
      ) : (
        oldPrice ? (
          <p className='special-price'>{oldPrice && <del>{oldPrice}&nbsp;zł</del>} {price}&nbsp;zł</p>
        ) : (
          <p className='price'>{price}&nbsp;zł</p>
        )
      )}
      <p className={styles.omnibus}>Najniższa cena z 30 dni przed obniżką: {omnibusPrice} zł</p>
      <BuyButton
        href={purchase_url}
        content_id={content_id}
        content_name={content_name}
      >
        Kup teraz
      </BuyButton>
      <div className={styles.paymentInfo}>
        <p>Bezpieczne płatności</p>
        <ul>
          <li><PaymentIcon.Visa /></li>
          <li><PaymentIcon.Mastercard /></li>
          <li><PaymentIcon.Przelewy24 /></li>
          <li><PaymentIcon.Blik /></li>
        </ul>
      </div>
    </section>
  );
}
