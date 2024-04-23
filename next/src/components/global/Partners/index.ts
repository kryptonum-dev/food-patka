import { ImgDataQuery } from '@/components/ui/image';
import Partners from './Partners';
export default Partners;
export type { PartnersTypes } from './Partners.types';

export const Partners_Query = `
  _type == "Partners" => {
    heading,
    list[] -> {
      logo {
        ${ImgDataQuery}
      },
      name,
      href,
    },
  },
`;
