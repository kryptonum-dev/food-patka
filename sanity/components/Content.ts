import { defineType } from "sanity";
import HeroHeaderAndImage from "../schema/components/HeroHeaderAndImage";
import FlexTiles from "../schema/components/FlexTiles";

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Komponenty',
  of: [
    HeroHeaderAndImage,
    FlexTiles,
    { type: 'InstagramShowcase' },
  ],
});