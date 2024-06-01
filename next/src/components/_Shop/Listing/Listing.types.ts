import type { ProductCardTypes } from '@/components/global/ProductCard';

export type ListingTypes = {
  heading: string;
  paragraph: string;
  currentPage: number;
  currentCategorySlug?: string;
  categories: {
    name: string;
    slug: string;
    postCount: number;
  }[];
  totalPages: number;
  products: ProductCardTypes[];
};
