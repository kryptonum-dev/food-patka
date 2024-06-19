export type ThankYouPageTypes = {
  searchParams: {
    ec_product: string;
    ec_product_id: string;
    ec_amount: number;
  };
};

export type AnalyticsTypes = ThankYouPageTypes['searchParams'];
