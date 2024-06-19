import { ImgDataQuery } from '@/components/ui/image';
import InstagramShowcase from './InstagramShowcase';
export default InstagramShowcase;
export type { InstagramShowcaseTypes } from './InstagramShowcase.types';

export const InstagramShowcase_Query = /* groq */ `
  _type == "InstagramShowcase" => {
    heading,
    list[] {
      url,
      img {
        ${ImgDataQuery}
      },
    },
  },
`;
