import type { ImgDataTypes } from '@/components/ui/image';
import type { DescriptionTypes } from './Description';

export type ProductTypes = {
  name: string;
  url: string;
  category: {
    name: string,
    slug: string;
    mainCategory?: {
      name: string;
      slug: string;
    };
  };
  hasVariants: boolean;
  variants?: {
    name: string;
    price: number;
    oldPrice?: number;
    omnibus: number;
  }[];
  cheapestVariant: {
    price: number;
    oldPrice?: number;
    omnibus: number;
  };
  price: number;
  oldPrice?: number;
  omnibus: number;
  gallery: ImgDataTypes[];
  currentVariantParam?: number;

} & Omit<DescriptionTypes, 'className'>;
