import { ImgDataQuery } from '@/components/ui/image';
import InfoTile from './InfoTile';
export default InfoTile;
export type { InfoTileTypes } from './InfoTile.types';

export const InfoTile_Query = `
  _type == "InfoTile" => {
    img {
      ${ImgDataQuery}
    },
    heading,
    paragraph,
  },
`;
