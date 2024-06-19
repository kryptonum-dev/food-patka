import type { ProductTypes } from '../Product.types';

export type ReviewsTypes = {
  data: {
    name: string;
    rating: number;
    content: string;
  }[];
  productId: ProductTypes['_id'];
};

export type FormTypes = {
  productId: ProductTypes['_id'];
  privacyPolicyLink: string;
  RatingIcon: React.ReactNode;
};

export type StarageReviesTypes = {
  id: ProductTypes['_id'];
  timestamp: number;
}[];
