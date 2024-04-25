import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Sekcja z nagłówkiem, zdjęciem i cechami';
const icon = () => '✅';

export default defineField({
  name: 'HeaderImageAndFeautures',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'markdown',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
              title: 'heading',
              subtitle: 'paragraph',
            },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle,
            }),
          },
        },
      ],
      validation: Rule => Rule.max(3),
      title: 'Lista cech',
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
      media,
      icon,
    }),
  },
});
