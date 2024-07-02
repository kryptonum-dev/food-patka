export type ThankYouPageTypes = {
  searchParams: {
    ec_product?: string;
    ec_product_uuid?: string;
    ec_amount?: number;
    ttclid?: string;
  };
};

export type AnalyticsTypes = ThankYouPageTypes['searchParams'];
