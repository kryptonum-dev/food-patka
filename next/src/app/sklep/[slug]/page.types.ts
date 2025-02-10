import type { ComponentTypes } from '@/components/Components';
import type { ProductTypes } from '@/components/_Shop/Product';

export type ShopProductPageTypes = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v: number, woo: boolean, [key: string]: string | number | boolean }>;
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
