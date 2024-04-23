import { ImgDataQuery } from '@/components/ui/image';
import { ButtonDataQuery } from '@/components/ui/Button';
import FlexTiles from './FlexTiles';
export default FlexTiles;
export type { FlexTilesTypes } from './FlexTiles.types';

export const FlexTiles_Query = `
  _type == "FlexTiles" => {
    heading,
    list[] {
      icon {
        ${ImgDataQuery}
      },
      heading,
      paragraph,
      cta {
        ${ButtonDataQuery}
      },
    },
  },
`;
