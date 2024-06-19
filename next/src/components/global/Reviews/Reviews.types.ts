export type ReviewsTypes = {
  index: number;
  heading: string;
  paragraph: string;
  list: {
    name: string;
    rating: number;
    productName: string;
    productSlug: string;
    content: string;
  }[];
};

export type SliderTypes = {
  list: {
    name: string;
    rating: number;
    productName: string;
    productSlug: string;
    content: React.ReactNode;
  }[];
  QuoteIcon: React.ReactNode;
  LeftArrowIcon: React.ReactNode;
  RightArrowIcon: React.ReactNode;
  PaginationIcon: React.ReactNode;
};
