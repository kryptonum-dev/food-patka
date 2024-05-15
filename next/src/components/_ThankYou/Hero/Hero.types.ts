import type { ButtonDataTypes } from '@/components/ui/Button';
import type { ImgDataTypes } from '@/components/ui/image';

export type HeroTypes = {
  img: ImgDataTypes;
  heading: string;
  paragraph: string;
  cta: ButtonDataTypes;
};
