import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Sekcja informacyjna';
const icon = () => 'ℹ️';

export default defineField({
  name: 'InfoTile',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'markdown',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraf',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'img',
    },
    prepare: ({ heading, media }) => ({
      title: title,
      subtitle: removeMarkdown(heading),
      media: media,
    }),
  }
});