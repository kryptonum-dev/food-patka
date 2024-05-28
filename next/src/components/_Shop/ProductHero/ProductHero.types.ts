import type { ImgDataTypes } from '@/components/ui/image';

export type ProductHeroTypes = {
  name: string;
  url: string;
  category: {
    name: string,
    slug: string;
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
};

export type GalleryTypes = {
  data: ImgDataTypes[];
};