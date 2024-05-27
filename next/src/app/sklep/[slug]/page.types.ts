import type { ProductHeroTypes } from '@/components/_Shop/ProductHero';

export type ShopProductPageTypes = {
  params: {
    slug: string;
  };
  searchParams: {
    v: number;
  };
};

export type BlogPostPageQueryTypes = Omit<ProductHeroTypes, 'currentVariantParam'>;