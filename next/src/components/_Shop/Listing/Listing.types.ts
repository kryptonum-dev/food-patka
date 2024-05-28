import type { ProductCardTypes } from '@/components/global/ProductCard';

export type ListingTypes = {
  heading: string;
  paragraph: string;
  currentPage?: number;
  currentCategorySlug?: string;
}

export type ListingQueryTypes = {
  categories: {
    name: string;
    slug: string;
    postCount: number;
  }[];
  totalPosts: number;
  products: ProductCardTypes[];
};
