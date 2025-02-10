import { ImgDataQuery } from '@/components/ui/image';
import HighlightedSection from './HighlightedSection';
export default HighlightedSection;
export type { HighlightedSectionTypes } from './HighlightedSection.types';
import { VideoDataQuery } from '@/components/ui/Video';

export const HighlightedSection_Query = `
  _type == "HighlightedSection" => {
    heading,
    paragraph,
    isReversed,
    img {
      ${ImgDataQuery}
    },
    ${VideoDataQuery('video')}
  },
`;
