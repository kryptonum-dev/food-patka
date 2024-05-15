import type { ButtonDataTypes } from '@/components/ui/Button';

export type PromoTypes = {
  heading: string;
  paragraph: string;
  cta?: ButtonDataTypes;
  expiry?: number;
};
