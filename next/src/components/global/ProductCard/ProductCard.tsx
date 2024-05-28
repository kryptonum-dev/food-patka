import Link from 'next/link';
import Img from '@/components/ui/image';
import Markdown from '@/components/ui/markdown';
import Button from '@/components/ui/Button';
import styles from './ProductCard.module.scss';
import { removeMarkdown } from '@/utils/remove-markdown';
import type { ProductCardTypes } from './ProductCard.types';

export default function ProductCard({
  thumbnail,
  name,
  slug,
  url,
  hasVariants,
  cheapestVariant,
  price,
  oldPrice
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
        <Markdown.h3 className={styles.heading}>{removeMarkdown(name)}</Markdown.h3>
        {(hasVariants && cheapestVariant) ? (
          <p className={styles.price}>od {cheapestVariant.oldPrice && <del>{cheapestVariant.oldPrice}&nbsp;zł</del>} {cheapestVariant.price}&nbsp;zł</p>
        ) : (
          <p className={styles.price}>{oldPrice && <del>{oldPrice}&nbsp;zł</del>} {price}&nbsp;zł</p>
        )}
        <Button
          href={url}
          className={styles.cta}
        >
          Kup teraz
        </Button>
      </header>
    </article>
  );
}
