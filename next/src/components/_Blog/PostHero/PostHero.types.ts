import { ImgDataTypes } from '@/components/ui/image';

export type PostHeroTypes = {
  title: string;
  subtitle: string;
  img: ImgDataTypes;
  _createdAt: string;
  category: {
    name: string;
    slug: string;
  };
};
