import type { StructureResolver } from 'sanity/structure'
import { createSingleton } from '../utils/create-singleton';

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(["global"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Zawartość')
    .items([
      createSingleton(S, "global"),
      S.divider(),
      createSingleton(S, "Index_Page"),
      createSingleton(S, "About_Page"),
      createSingleton(S, "Partners_Page"),
      createSingleton(S, "Contact_Page"),
      createSingleton(S, "NotFound_Page"),
      S.divider(),
      createSingleton(S, "Shop_Page"),
      S.documentTypeListItem("ProductCategory_Collection"),
      S.documentTypeListItem("Product_Collection"),
      S.divider(),
      createSingleton(S, "Blog_Page"),
      S.documentTypeListItem("BlogCategory_Collection"),
      S.documentTypeListItem("BlogPost_Collection"),
      S.divider(),
      S.documentTypeListItem("Faq_Collection"),
      S.documentTypeListItem("Partners_Collection"),
    ])
