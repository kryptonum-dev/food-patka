import { ProductCard_Query } from '../ProductCard';
import FeaturedProducts from './FeaturedProducts';
export default FeaturedProducts;
export type { FeaturedProductsTypes } from './FeaturedProducts.types';

export const FeaturedProducts_Query = `
  _type == "FeaturedProducts" => {
    heading,
    paragraph,
    list[] -> {
      ${ProductCard_Query}
    },
  },
`;
