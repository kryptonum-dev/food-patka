import type { ComponentTypes } from '@/components/Components';
import type { ProductCardTypes } from '@/components/global/ProductCard';

export type ShopPaginationPageTypes = {
  params: {
    page: number;
  };
};

export type ShopPaginationPageQueryTypes = {
  categories: {
    name: string;
    slug: string;
    postCount: number;
  }[];
  totalPosts: number;
  products: ProductCardTypes[];
  pageContent: {
    header: {
      heading: string;
      paragraph: string;
    };
    content: ComponentTypes[];
  };
};
