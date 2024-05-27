import Listing from './Listing';
export default Listing;
export type { ListingTypes } from './Listing.types';

export const Listing_Query = `
  listing {
    heading,
    paragraph
  },
`;
