export type ThankYouPageTypes = {
  searchParams: {
    ec_product: string;
    ec_product_id: string;
  };
};

export type AnalyticsTypes = {
  ec_product: ThankYouPageTypes['searchParams']['ec_product'];
  ec_product_id: ThankYouPageTypes['searchParams']['ec_product_id'];
};
