import { ImgDataQuery } from '@/components/ui/image';
import Reviews from './Reviews';
export default Reviews;
export type { ReviewsTypes } from './Reviews.types';

export const Reviews_Query = `
  _type == "Reviews" => {
    heading,
    paragraph,
    list[] -> {
      name,
      rating,
      "productName": product -> name,
      "productSlug": product -> slug.current,
      content,
      gallery[] {
        ${ImgDataQuery}
      },
    },
  },
`;
