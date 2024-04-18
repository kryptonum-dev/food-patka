import type { ImgDataTypes } from '@/components/ui/image';

export type HeaderQueryTypes = {
  nav: {
    annotation?: string;
    links: {
      name: string;
      href: string;
      links?: {
        name: string;
        href: string;
        img: ImgDataTypes;
      }[];
    }[]
  };
  socials: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  }
}

export type SocialMediaTypes = {
  data: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  }
}