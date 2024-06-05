import { ImgDataQuery } from '@/components/ui/image';
import YummyWishes from './YummyWishes';
export default YummyWishes;
export type { YummyWishesTypes } from './YummyWishes.types';

export const YummyWishes_Query = `
  _type == "YummyWishes" => {
    img {
      ${ImgDataQuery}
    },
    heading,
    paragraph,
  },
`;
