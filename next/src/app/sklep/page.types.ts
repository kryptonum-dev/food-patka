import type { ComponentTypes } from '@/components/Components';
import type { ProductCardTypes } from '@/components/global/ProductCard';

export type ShopPageQueryTypes = {
  categories: {
    name: string;
    slug: string;
    postCount: number;
  }[];
  totalPosts: number;
  products: ProductCardTypes[];
  page: {
    header: {
      heading: string;
      paragraph: string;
    };
    content: ComponentTypes[];
  };
};
