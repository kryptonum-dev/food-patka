import type { ButtonDataTypes } from '@/components/ui/Button/Button.types';
import type { ImgDataTypes } from '@/components/ui/image';

export type FlexTilesTypes = {
  heading: string;
  list: {
    icon: ImgDataTypes;
    heading: string;
    paragraph: string;
    cta: ButtonDataTypes;
  }[];
}
