import { ComponentTypes } from '@/components/Components';

export type BlogPageQueryTypes = {
  listing: {
    heading: string,
    paragraph: string;
  };
  content: ComponentTypes[];
};
