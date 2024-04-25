import { ImgDataQuery } from '@/components/ui/image';
import HeaderImageAndFeautures from './HeaderImageAndFeautures';
export default HeaderImageAndFeautures;
export type { HeaderImageAndFeauturesTypes } from './HeaderImageAndFeautures.types';

export const HeaderImageAndFeautures_Query = `
  _type == "HeaderImageAndFeautures" => {
    heading,
    img {
      ${ImgDataQuery}
    },
    list[] {
      heading,
      paragraph
    },
  },
`;
