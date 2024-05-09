import { ImgDataQuery } from '@/components/ui/image';
import { ImageGrid_Query } from './ImageGrid';
import PostContent from './PostContent';
export default PostContent;
export type { PostContentTypes } from './PostContent.types';

export const PostContent_Query = `
  content[] {
    ...,
    _type == "image" => {
      ${ImgDataQuery}
    },
    ${ImageGrid_Query}
  },
`;