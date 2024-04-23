import { ButtonDataQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/image';
import AboutSection from './AboutSection';
export default AboutSection;
export type { AboutSectionTypes } from './AboutSection.types';

export const AboutSection_Query = `
  _type == "AboutSection" => {
    heading,
    paragraph,
    cta {
      ${ButtonDataQuery}
    },
    img {
      ${ImgDataQuery}
    }
  },
`;
