import cta from './ui/cta';
import { global } from './singleTypes/global';
import Index_Page from './singleTypes/Index_Page';
import seo from './components/seo';
import Content from '../components/Content';
import Partners_Collection from './collectionTypes/Partners_Collection';
import About_Page from './singleTypes/About_Page';
import Faq_Collection from './collectionTypes/Faq_Collection';

export const schemaTypes = [
  cta,
  seo,
  global,
  Content,

  // Single types
  Index_Page,
  About_Page,

  // Collection types
  Partners_Collection,
  Faq_Collection,
];
