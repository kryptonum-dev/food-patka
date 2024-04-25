import { ButtonDataTypes } from '@/components/ui/Button/Button.types';
import { ImgDataTypes } from '@/components/ui/image';

export type TuckedImageSectionTypes = {
  index: number
  heading: string;
  paragraph: string;
  cta?: ButtonDataTypes;
  img: ImgDataTypes;
}
