import Link from 'next/link';
import BuyButton from '@/components/ui/BuyButton';
import Img from '@/components/ui/image';
import Markdown from '@/components/ui/markdown';
import styles from './ProductCard.module.scss';
import { removeMarkdown } from '@/utils/remove-markdown';
import ReviewScore from '@/components/ui/ReviewScore';
import type { ProductCardTypes } from './ProductCard.types';

export default function ProductCard({
  thumbnail,
  name,
  slug,
  url,
  hasVariants,
  cheapestVariant,
  price,
  oldPrice,
  analytics,
  rating,
  totalReviews
}: ProductCardTypes) {
  return (
    <article className={styles['ProductCard']}>
      <Link
        href={`/sklep/${slug}`}
        aria-label={`Sprawdź szczegóły produktu ${removeMarkdown(name)}`}
        className={styles.link}
      />
      <div className={styles.img}>
        <Img
          data={thumbnail}
          sizes='(max-width: 499px) 100vw, (max-width: 1049px) 222px, 379px'
        />
      </div>
      <header>
        <ReviewScore rating={rating} totalReviews={totalReviews} className={styles.ReviewScore} />
        <Markdown.h2 className={`${styles.heading} h3`}>{removeMarkdown(name)}</Markdown.h2>
        {(hasVariants && cheapestVariant) ? (
          <p className={styles.price}>od {cheapestVariant.oldPrice && <del>{cheapestVariant.oldPrice}&nbsp;zł</del>} {cheapestVariant.price}&nbsp;zł</p>
        ) : (
          <p className={styles.price}>{oldPrice && <del>{oldPrice}&nbsp;zł</del>} {price}&nbsp;zł</p>
        )}
        <BuyButton
          href={url}
          content_id={analytics?.item_id}
          content_name={analytics?.item_name}
        >
          Kup teraz
        </BuyButton>
      </header>
    </article>
  );
}
