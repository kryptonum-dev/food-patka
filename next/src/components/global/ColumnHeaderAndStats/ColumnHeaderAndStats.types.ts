import { ButtonDataTypes } from '@/components/ui/Button/Button.types';
import { ImgDataTypes } from '@/components/ui/image';

export type ColumnHeaderAndStatsTypes = {
  index: number;
  heading: string;
  paragraph: string;
  cta?: ButtonDataTypes;
  img: ImgDataTypes;
  list?: {
    number: number;
    label: string;
    icon: ImgDataTypes;
  }[];
}
