import type { ImgDataTypes } from '@/components/ui/image';
import { SocialMediaTypes } from '../SocialMedia';

export type ContactFormTypes = {
  index: number;
  isHighlighted: boolean;
  heading: string;
  paragraph: string;
  img: ImgDataTypes;
}

export type ContactFormQueryTypes = {
  socials: SocialMediaTypes;
}