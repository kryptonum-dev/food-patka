import { ImgDataTypes } from '@/components/ui/image';

export type PartnersTypes = {
  heading: string;
  list: {
    logo: ImgDataTypes;
    name: string;
    href?: string;
  }[];
}
