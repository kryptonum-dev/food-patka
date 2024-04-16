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
    ])
