import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "../schema";

export const createSingleton = (S: StructureBuilder, name: string) => {
  const { title, icon } = schemaTypes.find(item => item.name === name) as { title: string, icon: React.ReactNode };
  return S.listItem()
    .id(name)
    .title(title)
    .icon(icon)
    .child(S.document().title(title).schemaType(name).documentId(name));
};