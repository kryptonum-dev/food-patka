import type { ImgDataTypes } from '@/components/ui/image';
import type { PortableTextBlock } from 'next-sanity';

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
  content: PortableTextBlock;
}