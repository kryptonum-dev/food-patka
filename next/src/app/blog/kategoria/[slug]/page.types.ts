import { ComponentTypes } from '@/components/Components';

export type BlogCategoryPageTypes = {
  params: {
    slug: string;
  };
};

export type BlogCategoryPageQueryTypes = {
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
