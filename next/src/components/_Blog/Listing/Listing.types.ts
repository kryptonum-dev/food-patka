import { ImgDataTypes } from '@/components/ui/image';

export type ListingTypes = {
  heading: string;
  paragraph: string;
  currentPage?: number;
  currentCategorySlug?: string;
}

export type ListingQueryTypes = {
  categories: {
    name: string;
    slug: string;
    postCount: number;
  }[];
  totalPosts: number;
  posts: {
    title: string;
    subtitle: string;
    img: ImgDataTypes;
    slug: string;
  }[]
};

export type PostsTypes = {
  posts: ListingQueryTypes['posts'];
}