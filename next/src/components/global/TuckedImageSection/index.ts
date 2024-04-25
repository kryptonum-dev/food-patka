import { ButtonDataQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/image';
import TuckedImageSection from './TuckedImageSection';
export default TuckedImageSection;
export type { TuckedImageSectionTypes } from './TuckedImageSection.types';

export const TuckedImageSection_Query = `
  _type == "TuckedImageSection" => {
    heading,
    paragraph,
    cta {
      ${ButtonDataQuery}
    },
    img {
      ${ImgDataQuery}
    },
  },
`;
