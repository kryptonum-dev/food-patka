import cta from './ui/cta';
import { global } from './singleTypes/global';
import Index_Page from './singleTypes/Index_Page';
import seo from './components/seo';
import Content from '../components/Content';
import Partners_Collection from './collectionTypes/Partners_Collection';
import About_Page from './singleTypes/About_Page';
import Faq_Collection from './collectionTypes/Faq_Collection';
import Partners_Page from './singleTypes/Partners_Page';
import Contact_Page from './singleTypes/Contact_Page';
import NotFound_Page from './singleTypes/NotFound_Page';
import BlogCategory_Collection from './collectionTypes/BlogCategory_Collection';
import Blog_Page from './singleTypes/Blog_Page';
import BlogPost_Collection from './collectionTypes/BlogPost_Collection';
import Shop_Page from './singleTypes/Shop_Page';
import ShopCategory_Collection from './collectionTypes/ShopCategory_Collection';
import Product_Collection from './collectionTypes/Product_Collection';
import ThankYou_Page from './singleTypes/ThankYou_Page';

export const schemaTypes = [
  cta,
  seo,
  global,
  Content,

  // Single types
  Index_Page,
  About_Page,
  Partners_Page,
  Contact_Page,
  NotFound_Page,
  Blog_Page,
  Shop_Page,
  ThankYou_Page,

  // Collection types
  Partners_Collection,
  Faq_Collection,
  BlogCategory_Collection,
  BlogPost_Collection,
  ShopCategory_Collection,
  Product_Collection,
];
