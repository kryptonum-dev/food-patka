import type { ImgDataTypes } from '@/components/ui/image';
import type { PostContentTypes } from '@/components/_Blog/PostContent';

export type BlogPostPageTypes = {
  params: Promise<{ slug: string; }>
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
} & PostContentTypes
