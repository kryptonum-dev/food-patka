import { ImgDataTypes } from '@/components/ui/image';

export type FeaturesTypes = {
  heading: string;
  list: {
    img: ImgDataTypes;
    heading: string;
    paragraph: string;
  }[];
};
