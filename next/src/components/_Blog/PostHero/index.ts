import { ImgDataQuery } from '@/components/ui/image';
import PostHero from './PostHero';
export default PostHero;
export type { PostHeroTypes } from './PostHero.types';

export const PostHero_Query = `
  title,
  subtitle,
  img {
    ${ImgDataQuery}
  },
  "category": {
    "name": category -> name,
    "slug": category -> slug.current,
  },
  _createdAt,
`;
