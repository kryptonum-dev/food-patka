import type { ImgDataTypes } from '@/components/ui/image';
import type { DescriptionTypes } from './Description';
import type { BuyButtonTypes } from '@/components/ui/BuyButton';

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
  content_id: BuyButtonTypes['content_id'];
  content_name: BuyButtonTypes['content_name'];
  rating: number;
  totalReviews: number;
} & Omit<DescriptionTypes, 'className'>;
