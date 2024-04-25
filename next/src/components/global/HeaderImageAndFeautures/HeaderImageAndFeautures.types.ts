import { ImgDataTypes } from '@/components/ui/image';

export type HeaderImageAndFeauturesTypes = {
  index: number;
  heading: string;
  img: ImgDataTypes;
  list: {
    heading: string;
    paragraph: string;
  }[];
}
