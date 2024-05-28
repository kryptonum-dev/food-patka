import { ImgDataQuery } from '@/components/ui/image';
import CommunityTrust from './CommunityTrust';
export default CommunityTrust;
export type { CommunityTrustTypes } from './CommunityTrust.types';

export const CommunityTrust_Query = `
  _type == "CommunityTrust" => {
    images[] {
      ${ImgDataQuery}
    },
    title,
  },
`;
