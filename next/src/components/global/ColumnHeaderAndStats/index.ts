import { ButtonDataQuery } from '@/components/ui/Button';
import { ImgDataQuery } from '@/components/ui/image';
import ColumnHeaderAndStats from './ColumnHeaderAndStats';
export default ColumnHeaderAndStats;
export type { ColumnHeaderAndStatsTypes } from './ColumnHeaderAndStats.types';

export const ColumnHeaderAndStats_Query = `
  _type == "ColumnHeaderAndStats" => {
    heading,
    paragraph,
    cta {
      ${ButtonDataQuery}
    },
    img {
      ${ImgDataQuery}
    },
    list[] {
      number,
      label,
      icon {
        ${ImgDataQuery}
      },
    },
  },
`;
