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
  "url": select(hasVariants == false => select($isWoo == 'true' => url_woocommerce, url), null),
  hasVariants,
  'cheapestVariant': variants[] | order(price asc)[0],
  price,
  oldPrice,
  analytics {
    item_name,
    item_id,
  },
  "rating": round(math::avg(*[_type == "Review_Collection" && references(^._id) && visible]{rating}.rating), 1),
  "totalReviews": count(*[_type == "Review_Collection" && references(^._id) && visible]),
`;
