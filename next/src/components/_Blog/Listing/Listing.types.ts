export type ListingTypes = {
  heading: string;
  paragraph: string;
  currentCategorySlug?: string;
}

export type ListingQueryTypes = {
  categories: {
    name: string;
    slug: string;
  }[];
};
