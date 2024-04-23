import { ImgDataTypes } from '@/components/ui/image';

export type SimpleStatsTypes = {
  img: ImgDataTypes;
  list: {
    number: number;
    label: string;
  }[];
}
export type CounterTypes = {
  value: number;
};
