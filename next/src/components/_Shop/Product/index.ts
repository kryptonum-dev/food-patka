import { ImgDataQuery } from '@/components/ui/image';
import Product from './Product';
import { Description_Query } from './Description';
import { Reviews_Query } from '@/components/_Shop/Product/Reviews';
export default Product;
export type { ProductTypes } from './Product.types';

export const Product_Query = `
  name,
  url,
  category -> {
    name,
    "slug": slug.current,
    "mainCategory": mainCategory -> {
      name,
      "slug": slug.current,
    },
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
  },
  ${Description_Query}
  ${Reviews_Query}
`;
