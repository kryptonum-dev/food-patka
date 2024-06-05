import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Sekcja życzenia smacznego';
const icon = () => '🍽️';

export default defineField({
  name: 'YummyWishes',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
      initialValue: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-3bd4e51256934e1fdc4d50bc756a226b43aca15e-660x789-webp',
        },
      },
    }),
    defineField({
      name: 'heading',
      type: 'markdown',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
      initialValue: 'Życzę smacznego 😊',
    }),
    defineField({
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraf',
      validation: Rule => Rule.required(),
      initialValue: 'FoodPatka',
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