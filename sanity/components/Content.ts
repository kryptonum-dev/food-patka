import { defineType } from "sanity";
import HeroHeaderAndImage from "../schema/components/HeroHeaderAndImage";
import FlexTiles from "../schema/components/FlexTiles";
import AboutSection from "../schema/components/AboutSection";

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Komponenty',
  of: [
    HeroHeaderAndImage,
    FlexTiles,
    AboutSection,
    { type: 'InstagramShowcase' },
  ],
});