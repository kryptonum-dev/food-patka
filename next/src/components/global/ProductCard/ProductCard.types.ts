import type { ImgDataTypes } from '@/components/ui/image';

export type ProductCardTypes = {
  thumbnail: ImgDataTypes;
  name: string;
  slug: string;
  url: string;
  hasVariants: boolean;
  cheapestVariant?: {
    price: number;
    oldPrice?: number;
  };
  price?: number;
  oldPrice?: number;
};
