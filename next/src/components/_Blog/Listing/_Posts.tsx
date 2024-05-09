import styles from './Listing.module.scss';
import BlogPostCard from '@/components/global/BlogPostCard';
import type { PostsTypes } from './Listing.types';

export default function Posts({ posts }: PostsTypes) {
  return (
    <div className={styles['Posts']} id='wpisy'>
      {posts.map((item, i) => (
        <BlogPostCard key={i} {...item} />
      ))}
    </div>
  );
}