import { ImgDataQuery } from '@/components/ui/image';
import HighlightedSection from './HighlightedSection';
export default HighlightedSection;
export type { HighlightedSectionTypes } from './HighlightedSection.types';

export const HighlightedSection_Query = `
  _type == "HighlightedSection" => {
    heading,
    paragraph,
    isReversed,
    img {
      ${ImgDataQuery}
    },
    "video": video.asset -> url,
  },
`;
