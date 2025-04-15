import type { ImgDataTypes } from '@/components/ui/image';

export type ProductCardTypes = {
  thumbnail: ImgDataTypes;
  name: string;
  slug: string;
  url: string | null;
  hasVariants: boolean;
  cheapestVariant?: {
    price: number;
    oldPrice?: number;
  };
  price?: number;
  oldPrice?: number;
  rating: number;
  totalReviews: number;
  analytics: {
    item_name: string;
    item_id: string;
  };
};
