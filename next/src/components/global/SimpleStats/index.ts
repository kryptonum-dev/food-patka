import { ImgDataQuery } from '@/components/ui/image';
import SimpleStats from './SimpleStats';
export default SimpleStats;
export type { SimpleStatsTypes } from './SimpleStats.types';

export const SimpleStats_Query = `
  _type == "SimpleStats" => {
    img {
      ${ImgDataQuery}
    },
    list[] {
      number,
      label,
    },
  },
`;
