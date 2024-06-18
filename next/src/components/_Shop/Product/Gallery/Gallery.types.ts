import type { ImgDataTypes } from '@/components/ui/image';
import type { ProductTypes } from '../Product.types';

export type GalleryTypes = {
  data: ImgDataTypes[];
  ArrowLeftIcon: React.ReactNode;
  ArrowRightIcon: React.ReactNode;
  className: React.HTMLProps<HTMLElement>['className'];
  numberOfRecentPurchases: ProductTypes['numberOfRecentPurchases'];
};
