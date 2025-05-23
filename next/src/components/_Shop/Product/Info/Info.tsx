import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import styles from './Info.module.scss';
import { PaymentIcon } from './PaymentIcon';
import BuyButton from '@/components/ui/BuyButton';
import ReviewScore from '@/components/ui/ReviewScore';
import type { ProductTypes } from '../Product.types';
import FloatingBuyButton from '../FloatingBuyButton';

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
  searchParams,
  isWoo
}: Omit<ProductTypes, '_id' | 'gallery' | 'category' | 'description' | 'reviews' | 'numberOfRecentPurchases'> &
  { className: React.HTMLProps<HTMLElement>['className'] }
) {
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;
  const omnibusPrice = hasVariants ? (currentVariant?.omnibus || cheapestVariant.omnibus) : omnibus;

  // Get base purchase URL
  let purchase_url = isWoo
    ? currentVariant?.url || url
    : currentVariant?.url || url || variants?.[0]?.url || '';

  // Add all URL parameters to purchase_url
  if (purchase_url && Object.keys(searchParams || {}).length > 0) {
    // Filter out 'v' and 'woo' params which are used internally
    const urlParams = new URLSearchParams();
    Object.keys(searchParams).forEach(key => {
      if (key !== 'v' && key !== 'woo') {
        urlParams.append(key, String(searchParams[key]));
      }
    });

    if (urlParams.toString()) {
      // Check if URL already has parameters
      const hasParams = purchase_url.includes('?');
      purchase_url += hasParams ? `&${urlParams.toString()}` : `?${urlParams.toString()}`;
    }
  }

  const isDisabled = purchase_url ? false : true;

  // Determine button text based on variant selection and isWoo
  // - If disabled: "Wybierz wariant"
  // - If variant selected (or no variants): "Kup teraz · price zł"
  // - If no variant selected and not disabled: "Kup teraz"
  const buttonText = isDisabled
    ? 'Wybierz wariant'
    : `Kup teraz${currentVariant || !hasVariants ? `\u00A0\u00A0·\u00A0\u00A0${currentVariant?.price || price} zł` : ''}`;

  return (
    <>
      <section className={`${styles['Info']} ${className}`} data-product-info-section>
        <ReviewScore rating={rating} totalReviews={totalReviews} />
        <Markdown.h1>{name}</Markdown.h1>
        {hasVariants && (
          <ul className={styles.categories}>
            {variants?.map(({ name }, i) => (
              <li key={i}>
                <Link
                  href={{
                    pathname: null,
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
          disabled={isDisabled}
        >
          {buttonText}
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
      <FloatingBuyButton className={styles.floatingBuyButton}>
        {hasVariants && (
          <div className={styles.categories}>
            <ul>
              {variants?.map(({ name }, i) => (
                <li key={i}>
                  <Link
                    href={{
                      pathname: null,
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
          </div>
        )}
        <BuyButton
          href={purchase_url}
          content_id={content_id}
          content_name={content_name}
          disabled={isDisabled}
        >
          {buttonText}
        </BuyButton>
      </FloatingBuyButton >
    </>
  );
}
