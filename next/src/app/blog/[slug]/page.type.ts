import { ImgDataTypes } from '@/components/ui/image';

export type BlogPostPageTypes = {
  params: {
    slug: string;
  };
};

export type BlogPostPageQueryTypes = {
  title: string;
  subtitle: string;
  img: ImgDataTypes;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  _createdAt: string;
}