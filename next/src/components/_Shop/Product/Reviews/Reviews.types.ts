import type { ImgDataTypes } from '@/components/ui/image';

export type ReviewsTypes = {
  data: {
    name: string;
    rating: number;
    content: string;
    gallery?: ImgDataTypes[];
  }[];
};
