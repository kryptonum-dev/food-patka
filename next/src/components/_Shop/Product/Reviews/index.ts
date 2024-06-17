import { ImgDataQuery } from '@/components/ui/image';
import Reviews from './Reviews';
export default Reviews;
export type { ReviewsTypes } from './Reviews.types';

export const Reviews_Query = `
  "reviews": *[_type == 'Review_Collection' && references(^._id)][] {
    name,
    rating,
    content,
    gallery[] {
      ${ImgDataQuery}
    },
  },
`;
