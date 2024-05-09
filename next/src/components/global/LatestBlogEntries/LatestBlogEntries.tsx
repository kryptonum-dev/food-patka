import Markdown from '@/components/ui/markdown';
import styles from './LatestBlogEntries.module.scss';
import BlogPostCard from '../BlogPostCard';
import type { LatestBlogEntriesTypes } from './LatestBlogEntries.types';

export default function LatestBlogEntries({ heading, paragraph, posts }: LatestBlogEntriesTypes) {
  return (
    <section className={styles['LatestBlogEntries']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      <div className={styles.posts}>
        {posts.map((item, i) => (
          <BlogPostCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
