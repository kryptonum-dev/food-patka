import { ButtonDataQuery } from '@/components/ui/Button';
import Promo from './Promo';
export default Promo;
export type { PromoTypes } from './Promo.types';

export const Promo_Query = `
  promo {
    heading,
    paragraph,
    cta {
      ${ButtonDataQuery}
    },
    expiry,
  },
`;
