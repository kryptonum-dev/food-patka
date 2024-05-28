import type { ImgDataTypes } from '@/components/ui/image';

export type GalleryTypes = {
  data: ImgDataTypes[];
  ArrowLeftIcon: React.ReactNode;
  ArrowRightIcon: React.ReactNode;
  className: React.HTMLProps<HTMLElement>['className'];
};
