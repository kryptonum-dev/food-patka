
import type { ShopPageQueryTypes } from '@/app/sklep/page.types';
import type { ProductCardTypes } from '@/components/global/ProductCard';

export type ListingTypes = {
  heading: string;
  paragraph: string;
  currentPage: number;
  categories: ShopPageQueryTypes['categories'];
  totalPages: number;
  products: ProductCardTypes[];
  mainCategorySlug?: string;
  subCategorySlug?: string;
};
