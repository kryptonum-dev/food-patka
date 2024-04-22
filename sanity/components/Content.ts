import { defineType } from "sanity";
import HeroHeaderAndImage from "../schema/components/HeroHeaderAndImage";

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Komponenty',
  of: [
    HeroHeaderAndImage,
    { type: 'InstagramShowcase' },
  ],
});