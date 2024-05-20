import { ImgDataQuery } from '@/components/ui/image';
import Features from './Features';
export default Features;
export type { FeaturesTypes } from './Features.types';

export const Features_Query = `
  _type == "Features" => {
    heading,
    list[] {
      img {
        ${ImgDataQuery}
      },
      heading,
      paragraph,
    },
  },
`;
