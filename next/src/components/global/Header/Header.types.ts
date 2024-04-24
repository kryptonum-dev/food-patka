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
    }[];
  };
}

export type _HeaderTypes = {
  logo: React.ReactNode;
  DropdownIcon: React.ReactNode;
  IndicatorIcon: React.ReactNode;
  BackIcon: React.ReactNode;
  links: {
    name: string;
    href: string;
    links?: {
      name: string;
      href: string;
      img: React.ReactNode;
    }[];
  }[]
}