import type { ImgDataTypes } from '@/components/ui/image';
import type { DescriptionTypes } from './Description';
import type { BuyButtonTypes } from '@/components/ui/BuyButton';
import type { ReviewsTypes } from '@/components/_Shop/Product/Reviews';

export type ProductTypes = {
  _id: string;
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
    url: string;
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
  reviews: ReviewsTypes['data'];
  numberOfRecentPurchases: number;
} & Omit<DescriptionTypes, 'className'>;
