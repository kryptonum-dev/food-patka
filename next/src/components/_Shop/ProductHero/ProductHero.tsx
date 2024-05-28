import Markdown from '@/components/ui/markdown';
import styles from './ProductHero.module.scss';
import Button from '@/components/ui/Button';
import Img from '@/components/ui/image';
import type { ProductHeroTypes } from './ProductHero.types';
import Link from 'next/link';
import { PaymentIcon } from './PaymentIcon';
import Gallery from './Gallery';

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
      <Gallery data={gallery} />
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
