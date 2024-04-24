import { defineType } from "sanity";
import HeroHeaderAndImage from "../schema/components/HeroHeaderAndImage";
import FlexTiles from "../schema/components/FlexTiles";
import AboutSection from "../schema/components/AboutSection";
import SimpleStats from "../schema/components/SimpleStats";
import InstagramShowcase from "../schema/components/InstagramShowcase";
import Partners from "../schema/components/Partners";
import Faq from "../schema/components/Faq";
import ColumnHeaderAndStats from "../schema/components/ColumnHeaderAndStats";

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Komponenty',
  of: [
    HeroHeaderAndImage,
    FlexTiles,
    AboutSection,
    SimpleStats,
    InstagramShowcase,
    Partners,
    Faq,
    ColumnHeaderAndStats,
  ],
});