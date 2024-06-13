import type { ImgDataTypes } from '@/components/ui/image';
import type { DescriptionTypes } from './Description';
import type { ButButtonTypes } from '@/components/ui/ButButton';

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
  content_id: ButButtonTypes['content_id'];
  content_name: ButButtonTypes['content_name'];
} & Omit<DescriptionTypes, 'className'>;
