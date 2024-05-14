import type { Metadata } from 'next';

export type QueryMetadataTypes = {
  name: string;
  path: string;
  dynamicSlug?: string;
  titleSuffix?: string;
};

export type QueryTypes = {
  title: string;
  description: string;
  img?: string;
};

export type SeoTypes = {
  title: string;
  description: string;
  path: string;
  img?: string;
} & Metadata;

export type GlobalQueryTypes = {
  og_Img: string;
};
