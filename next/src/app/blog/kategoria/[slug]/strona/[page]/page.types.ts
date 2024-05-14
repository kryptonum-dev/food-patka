import type { BlogCategoryPageQueryTypes } from '../../page.types';

export type BlogCategoryPaginationPageTypes = {
  params: {
    slug: string;
    page: number;
  };
};

export type BlogCategoryPaginationPageQueryTypes = BlogCategoryPageQueryTypes