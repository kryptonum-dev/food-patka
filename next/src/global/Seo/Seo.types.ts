import type { Metadata } from 'next';

export type QueryMetadataTypes = {
  name: string;
  path: string;
  dynamicSlug?: string;
  titleSuffix?: string;
};

type OpenGraphImageTypes = {
  url: string;
  height: number;
};

export type QueryTypes = {
  title: string;
  description: string;
  openGraphImage?: OpenGraphImageTypes;
};

export type SeoTypes = {
  title: string;
  description: string;
  path: string;
  openGraphImage?: OpenGraphImageTypes;
} & Metadata;

export type GlobalQueryTypes = {
  globalOpenGraphImage: OpenGraphImageTypes
};
