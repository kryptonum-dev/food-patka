import { defineField, defineType } from "sanity";
import { slugify } from "../../../utils/slugify";
import { removeMarkdown } from "../../../utils/remove-markdown";
import ImageGrid from "./ImageGrid";
import Quote from "./Quote";
import OrderedList from "./OrderedList";

const title = 'Blog – Artykuły';
const icon = () => '🗞️';

export default defineType({
  name: 'BlogPost_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'title',
      type: 'markdown',
      title: 'Tytuł',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Slug, to unikalny ciąg znaków, który znajdziemy zazwyczaj po ukośniku w adresie URL podstrony. Dzięki niemu jego forma jest zrozumiała dla użytkowników.',
      options: {
        source: 'title',
        slugify: input => `${slugify(input)}`,
      },
      validation: Rule =>
        Rule.custom(slug => {
          if (!slug?.current) return true;
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return 'Slug może zawierać tylko małe litery, cyfry oraz łączniki. Upewnij się, że nie zawiera on znaków specjalnych ani wielkich liter.';
          }
          return true;
        }).required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'markdown',
      title: 'Podtytuł',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Powiązana kategoria',
      to: { type: 'BlogCategory_Collection' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
        },
        ImageGrid,
        Quote,
        OrderedList,
      ],

      title: 'Zawartość',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'img',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: removeMarkdown(title),
      subtitle: subtitle,
      media,
      icon,
    }),
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});