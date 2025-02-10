export type ThankYouPageTypes = {
  searchParams: Promise<{
    ec_product?: string;
    ec_product_uuid?: string;
    ec_amount?: number;
    ttclid?: string;
    epik?: string;
  }>;
};

export type AnalyticsTypes = Awaited<ThankYouPageTypes['searchParams']>;
