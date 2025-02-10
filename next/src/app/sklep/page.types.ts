import type { ComponentTypes } from '@/components/Components';
import type { ProductCardTypes } from '@/components/global/ProductCard';
import type { ImgDataTypes } from '@/components/ui/image';

export type ShopPageTypes = {
  params: Promise<{
    page: number;
    mainCategorySlug: string;
    subCategorySlug: string;
  }>;
  searchParams: Promise<{
    woo: boolean;
  }>;
};

export type ShopPageQueryTypes = {
  categories: {
    name: string;
    slug: string;
    productCount: number;
    thumbnail: ImgDataTypes;
  }[];
  mainCategory: {
    name: string;
    slug: string;
    header: {
      heading: string;
      paragraph: string;
    };
  };
  subCategory: {
    name: string;
    slug: string;
    header: {
      heading: string;
      paragraph: string;
    };
  };
  totalProducts: number;
  products: ProductCardTypes[];
  pageContent: {
    header: {
      heading: string;
      paragraph: string;
    };
    content: ComponentTypes[];
  };
};
