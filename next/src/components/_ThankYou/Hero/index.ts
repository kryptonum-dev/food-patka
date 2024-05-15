import { ImgDataQuery } from '@/components/ui/image';
import { ButtonDataQuery } from '@/components/ui/Button';
import Hero from './Hero';
export default Hero;
export type { HeroTypes } from './Hero.types';

export const Hero_Query = `
  hero {
    img {
      ${ImgDataQuery}
    },
    heading,
    paragraph,
    cta {
      ${ButtonDataQuery}
    },
  },
`;
