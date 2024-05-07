import type { ComponentTypes } from '@/components/Components';

export type BlogPaginationPageTypes = {
  params: {
    page: number;
  };
};

export type BlogPaginationPageQueryTypes = {
  listing: {
    heading: string,
    paragraph: string;
  };
  content: ComponentTypes[];
}