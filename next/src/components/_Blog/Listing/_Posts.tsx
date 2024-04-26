import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import Button from '@/components/ui/Button';
import styles from './Listing.module.scss';
import { removeMarkdown } from '@/utils/remove-markdown';
import type { PostsTypes } from './Listing.types';

export default function Posts({ posts }: PostsTypes) {
  return (
    <div className={styles['Posts']}>
      {posts.map(({ title, subtitle, img, slug }, i) => (
        <div className={styles.item} key={i}>
          <div className={styles.img}>
            <Img data={img} sizes='' />
          </div>
          <div className={styles.wrapper}>
            <Markdown.h2 className='h3'>{removeMarkdown(title)}</Markdown.h2>
            <Markdown className={styles.subtitle}>{subtitle}</Markdown>
            <Button href={slug}>Przeczytaj więcej</Button>
          </div>
        </div>
      ))}
    </div>
  );
}