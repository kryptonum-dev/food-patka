/**
 * Global declaration of themeColor in HEX format.
 * @constant
 */
export const THEME_COLOR: string = '#FFF6F9';

/**
 * Global declaration of backgroundColor in HEX format.
 * @constant
 */
export const BACKGROUND_COLOR: string = '#FFFDFD';

/**
 * Global declaration of page language.
 * @constant
 */
export const LOCALE: string = 'pl';

/**
 * Global declaration of domain name of the website. Be aware of the protocol and www or non-www prefix.
 * @constant
 */
export const DOMAIN: string = 'https://foodpatka.pl';

/**
 * Global default title.
 * @constant
 */
export const DEFAULT_TITLE: string = 'FoodPatka';

/**
 * Global description.
 * @constant
 */
export const DEFAULT_DESCRIPTION: string = 'Przyjemność z jedzenia może iść w parze z dbaniem o zdrowie!';

/**
 * URL for the main logo.
 * @constant
 */
export const LOGO_URL: string = `${DOMAIN}/food-patka-logo.png`;

/**
 * Global declaration of regex.
 * @constant
 */
export const REGEX: { email: RegExp; phone: RegExp; string: RegExp } = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^(?:\+(?:\d{1,3}))?(?:[ -]?\(?\d{1,4}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,6})$/,
  string: /^(?!\s+$)(.*?)\s*$/,
};

/**
 * Declaration of global easing.
 * @constant
 */
export const EASING: number[] = [0.6, -0.15, 0.27, 1.15];

/**
 * Declaration of global easing.
 * @constant
 */
export const PAGINATION_LIMIT: number = 2;