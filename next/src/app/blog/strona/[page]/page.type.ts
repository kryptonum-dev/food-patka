import type { ComponentTypes } from '@/components/Components';

export type BlogPaginationPageTypes = {
  params: Promise<{ page: number }>;
};

export type BlogPaginationPageQueryTypes = {
  listing: {
    heading: string,
    paragraph: string;
  };
  content: ComponentTypes[];
}
