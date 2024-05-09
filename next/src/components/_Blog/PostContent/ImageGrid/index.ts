import { ImgDataQuery } from '@/components/ui/image';
import ImageGrid from './ImageGrid';
export default ImageGrid;
export type { ImageGridTypes } from './ImageGrid.types';

export const ImageGrid_Query = `
  _type == "ImageGrid" => {
    "images": images[] {
      ${ImgDataQuery}
    },
  },
`;
