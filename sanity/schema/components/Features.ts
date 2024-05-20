import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Sekcja z opisem cech';
const icon = () => '✅';

export default defineField({
  name: 'Features',
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
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'img',
              type: 'image',
              title: 'Ikonka',
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
              img: 'img',
              heading: 'heading',
              paragraph: 'paragraph',
            },
            prepare: ({ img, heading, paragraph }) => ({
              title: removeMarkdown(heading),
              subtitle: removeMarkdown(paragraph),
              media: img,
            }),
          },
        },
      ],
      title: 'Lista',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: removeMarkdown(heading),
      icon,
    }),
  },
});
