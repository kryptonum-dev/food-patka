import Reviews from './Reviews';
export default Reviews;
export type { ReviewsTypes } from './Reviews.types';

export const Reviews_Query = /* groq */ `
  "reviews": *[_type == 'Review_Collection' && references(^._id) && visible][] {
    name,
    rating,
    content,
  },
`;
