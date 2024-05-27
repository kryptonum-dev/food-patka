import { ImgDataQuery } from '@/components/ui/image';
import ProductHero from './ProductHero';
export default ProductHero;
export type { ProductHeroTypes } from './ProductHero.types';

export const ProductHero_Query = `
  name,
  url,
  category -> {
    name,
    'slug': slug.current,
  },
  hasVariants,
  variants[] {
    name,
    price,
    oldPrice,
    omnibus,
  },
  "cheapestVariant": variants[] | order(price asc)[0],
  price,
  oldPrice,
  omnibus,
  gallery[] {
    ${ImgDataQuery}
  }
`;
