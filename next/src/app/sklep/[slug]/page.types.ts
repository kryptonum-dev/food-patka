import type { ComponentTypes } from '@/components/Components';
import type { ProductTypes } from '@/components/_Shop/Product';

export type ShopProductPageTypes = {
  params: {
    slug: string;
  };
  searchParams: {
    v: number;
  };
};

export type ShopProductPageQueryTypes = Omit<ProductTypes, 'currentVariantParam'> & {
  content: ComponentTypes[];
  analytics: {
    item_name: string;
    item_id: string;
  };
  rating: number;
  totalReviews: number;
  RecentPurchases: {
    min: number;
    max: number;
  };
  openGraphImageUrl?: string;
};