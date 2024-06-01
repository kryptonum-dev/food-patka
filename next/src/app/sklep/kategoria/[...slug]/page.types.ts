import type { ComponentTypes } from '@/components/Components';

export type ShopCategoryPageTypes = {
  params: {
    slug: string[];
  };
};

export type ShopCategoryPageQueryTypes = {
  category: {
    name: string;
    slug: string;
    header: {
      heading: string;
      paragraph: string;
    };
  },
  page: {
    content: ComponentTypes[];
  };
};
