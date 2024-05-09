import { ImgDataQuery } from '@/components/ui/image';
import { ImageGrid_Query } from './ImageGrid';
import { Quote_Query } from './Quote';
import { OrderedList_Query } from './OrderedList';
import PostContent from './PostContent';
export default PostContent;
export type { PostContentTypes } from './PostContent.types';

export const PostContent_Query = `
  "headings": content[length(style) == 2 && string::startsWith(style, "h2")],
  content[] {
    ...,
    _type == "image" => {
      ${ImgDataQuery}
    },
    ${ImageGrid_Query}
    ${Quote_Query}
    ${OrderedList_Query}
  },
`;
