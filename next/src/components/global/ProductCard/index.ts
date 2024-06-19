import { ImgDataQuery } from '@/components/ui/image';
import ProductCard from './ProductCard';
export default ProductCard;
export type { ProductCardTypes } from './ProductCard.types';

export const ProductCard_Query = /* groq */ `
  'thumbnail': gallery[0] {
    ${ImgDataQuery}
  },
  name,
  'slug': slug.current,
  url,
  hasVariants,
  'cheapestVariant': variants[] | order(price asc)[0],
  price,
  oldPrice,
  analytics {
    item_name,
    item_id,
  },
  "rating": math::avg(*[_type == 'Review_Collection' && references(^._id) && visible]{rating}.rating),
  "totalReviews": count(*[_type == 'Review_Collection' && references(^._id) && visible]),
`;
