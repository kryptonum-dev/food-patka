import type { BlogCategoryPageQueryTypes } from '../../page.types';

export type BlogCategoryPaginationPageTypes = {
  params: Promise<{
    slug: string;
    page: number;
  }>;
};

export type BlogCategoryPaginationPageQueryTypes = BlogCategoryPageQueryTypes
