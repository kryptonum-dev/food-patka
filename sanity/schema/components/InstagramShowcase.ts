import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Prezentacja instagrama';
const icon = () => '📸';

export default defineField({
  name: 'InstagramShowcase',
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
        defineField({
          name: 'post',
          type: 'object',
          title: 'Post',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Link do posta',
              validation: Rule => Rule.required().uri({ scheme: ['https'] }),
            }),
            defineField({
              name: 'img',
              type: 'image',
              title: 'Zdjęcie',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              url: 'url',
              img: 'img',
            },
            prepare: ({ url, img }) => ({
              title: url,
              media: img,
            }),
          }
        })
      ],
      title: 'Lista zdjęć',
      validation: Rule => Rule.required().max(3),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      list: 'list',
    },
    prepare: ({ heading, list }) => ({
      title: title,
      subtitle: removeMarkdown(heading),
      icon,
      media: list.length > 0 && list[0]?.img,
    }),
  },
});
