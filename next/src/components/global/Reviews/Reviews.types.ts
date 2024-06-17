import type { ImgDataTypes } from '@/components/ui/image';

export type ReviewsTypes = {
  index: number;
  heading: string;
  paragraph: string;
  list: {
    name: string;
    rating: number;
    productName: string;
    content: string;
    gallery?: ImgDataTypes[];
  }[];
};

export type SliderTypes = {
  list: {
    name: string;
    rating: number;
    productName: string;
    content: React.ReactNode;
    gallery?: React.ReactNode[];
  }[];
  QuoteIcon: React.ReactNode;
  LeftArrowIcon: React.ReactNode;
  RightArrowIcon: React.ReactNode;
  PaginationIcon: React.ReactNode;
};
