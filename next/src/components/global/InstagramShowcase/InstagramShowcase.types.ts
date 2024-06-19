import type { ImgDataTypes } from '@/components/ui/image';

export type InstagramShowcaseTypes = {
  index: number;
  heading: string;
  list: {
    url: string;
    img: ImgDataTypes;
  }[];
};
