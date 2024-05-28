import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import styles from './ProductHero.module.scss';
import Button from '@/components/ui/Button';
import Gallery from './Gallery';
import { PaymentIcon } from './PaymentIcon';
import type { ProductHeroTypes } from './ProductHero.types';

export default function ProductHero({
  name,
  url,
  hasVariants,
  variants,
  cheapestVariant,
  price,
  oldPrice,
  omnibus,
  gallery,
  currentVariantParam
}: Omit<ProductHeroTypes, 'category'>) {
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;

  return (
    <section className={styles['ProductHero']}>
      <Gallery
        data={gallery}
        ArrowLeftIcon={ArrowLeftIcon}
        ArrowRightIcon={ArrowRightIcon}
      />
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
                  <span>{name}</span>
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
                <p className={styles.omnibus}>Najniższa cena z 30 dni przed obniżką: {currentVariant.omnibus} zł</p>
              </>
            ) : (
              <>
                {cheapestVariant.oldPrice ? (
                  <p>od <del>{cheapestVariant.oldPrice} zł</del> {cheapestVariant.price} zł</p>
                ) : (
                  <p>od {cheapestVariant.price} zł</p>
                )}
                <p className={styles.omnibus}>Najniższa cena z 30 dni przed obniżką: {cheapestVariant.omnibus} zł</p>
              </>
            )
          ) : (
            <>
              <p>{oldPrice && <del>{oldPrice}&nbsp;zł</del>} {price}&nbsp;zł</p>
              <p className={styles.omnibus}>Najniższa cena z 30 dni przed obniżką: {omnibus} zł</p>
            </>
          )}
        </div>
        <Button href={url}>Kup teraz</Button>
        <div className={styles.paymentInfo}>
          <p>Bezpieczne płatności</p>
          <ul>
            <li>
              <PaymentIcon.Visa />
            </li>
            <li>
              <PaymentIcon.Mastercard />
            </li>
            <li>
              <PaymentIcon.Przelewy24 />
            </li>
            <li>
              <PaymentIcon.Blik />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const ArrowLeftIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={25}
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      d='M5.586 13.195h-.15l.106.107 5.477 5.463a.69.69 0 0 1-.222 1.122.69.69 0 0 1-.75-.148L3.29 12.997a.69.69 0 0 1 0-.973l6.741-6.758a.688.688 0 1 1 .974.972L5.54 11.714l-.106.106h.15l14.69-.018a.688.688 0 1 1 .002 1.376z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
const ArrowRightIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={25}
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      d='M19.414 13.18h.15l-.106.106-5.463 5.476a.689.689 0 0 0 .974.972l6.741-6.758a.686.686 0 0 0 0-.973L14.95 5.26a.688.688 0 0 0-.972.974l5.477 5.463.107.107h-.15l-14.69.018a.687.687 0 0 0 .001 1.374l14.69-.017Z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);