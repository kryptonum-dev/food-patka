import type { ProductTypes } from '@/components/_Shop/Product';

export type ShopProductPageTypes = {
  params: {
    slug: string;
  };
  searchParams: {
    v: number;
  };
};

export type ShopProductPageQueryTypes = Omit<ProductTypes, 'currentVariantParam'>;