import ProductCard from '@/components/global/ProductCard';
import Markdown from '@/components/ui/markdown';
import styles from './FeaturedProducts.module.scss';
import type { FeaturedProductsTypes } from './FeaturedProducts.types';

export default function FeaturedProducts({ heading, paragraph, list }: FeaturedProductsTypes) {
  return (
    <section className={styles['FeaturedProducts']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown>{paragraph}</Markdown>
      </header>
      <div className={styles.list}>
        {list?.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </section>
  );
}
