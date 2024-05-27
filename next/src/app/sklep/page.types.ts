import type { ComponentTypes } from '@/components/Components';

export type ShopPageQueryTypes = {
  listing: {
    heading: string,
    paragraph: string;
  };
  content: ComponentTypes[];
};
