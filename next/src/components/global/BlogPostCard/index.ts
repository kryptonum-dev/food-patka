import { ImgDataQuery } from '@/components/ui/image';
import BlogPostCard from './BlogPostCard';
export default BlogPostCard;
export type { BlogPostCardTypes } from './BlogPostCard.types';

export const BlogPostCard_Query = `
  "slug": slug.current,
  title,
  subtitle,
  img {
    ${ImgDataQuery}
  },
`;
