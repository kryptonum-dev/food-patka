import type { ButtonDataTypes } from '@/components/ui/Button/Button.types';
import type { ImgDataTypes } from '@/components/ui/image';

export type HeroHeaderAndImageTypes = {
  index: number;
  heading: string;
  paragraph: string;
  cta: ButtonDataTypes;
  img: ImgDataTypes
}
