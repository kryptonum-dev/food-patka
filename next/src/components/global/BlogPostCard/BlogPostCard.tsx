import Link from 'next/link';
import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import Button from '@/components/ui/Button';
import styles from './BlogPostCard.module.scss';
import { removeMarkdown } from '@/utils/remove-markdown';
import type { BlogPostCardTypes } from './BlogPostCard.types';

export default function BlogPostCard({ title, subtitle, img, slug }: BlogPostCardTypes) {
  return (
    <section className={styles['BlogPostCard']}>
      <Link href={`/blog/${slug}`} className={styles.img}>
        <Img data={img} sizes='' />
      </Link>
      <div className={styles.wrapper}>
        <Markdown.h2 className='h3'>{removeMarkdown(title)}</Markdown.h2>
        <Markdown className={styles.subtitle}>{subtitle}</Markdown>
        <Button href={`/blog/${slug}`}>Przeczytaj więcej</Button>
      </div>
    </section>
  );
}
