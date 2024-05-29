import { CommunityTrust_Query } from './CommunityTrust';
import { HighlightedSection_Query } from './HighlightedSection';
import { OrderedList_Query } from './OrderedList';
import { ImgDataQuery } from '@/components/ui/image';
import Description from './Description';
export default Description;
export type { DescriptionTypes } from './Description.types';

export const Description_Query = `
  description[] {
    ...,
    _type == "image" => {
      ${ImgDataQuery}
    },
    ${CommunityTrust_Query}
    ${HighlightedSection_Query}
    ${OrderedList_Query}
  },
`;
