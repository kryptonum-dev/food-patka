import { ButtonQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/image';
import HeroHeaderAndImage from './HeroHeaderAndImage';
export default HeroHeaderAndImage;
export type { HeroHeaderAndImageTypes } from './HeroHeaderAndImage.types';

export const HeroHeaderAndImage_Query = `
  _type == "HeroHeaderAndImage" => {
    heading,
    paragraph,
    cta {
      ${ButtonQuery}
    },
    img {
      ${ImgDataQuery}
    },
  },
`;
