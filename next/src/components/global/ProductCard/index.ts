import { ImgDataQuery } from '@/components/ui/image';
import ProductCard from './ProductCard';
export default ProductCard;
export type { ProductCardTypes } from './ProductCard.types';

export const ProductCard_Query = `
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
`;
