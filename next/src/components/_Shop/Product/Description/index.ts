import { CommunityTrust_Query } from './CommunityTrust';
import { HighlightedSection_Query } from './HighlightedSection';
import Description from './Description';
export default Description;
export type { DescriptionTypes } from './Description.types';

export const Description_Query = `
  description[] {
    ...,
    ${CommunityTrust_Query}
    ${HighlightedSection_Query}
  },
`;
