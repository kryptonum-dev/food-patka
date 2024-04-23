import { defineField } from 'sanity';

const title = 'Proste statystyki';
const icon = () => '📊';

export default defineField({
  name: 'SimpleStats',
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
      name: 'list',
      type: 'array',
      title: 'Kafelki',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              type: 'number',
              title: 'Liczba',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'string',
              title: 'Opis',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return ({
                title,
                subtitle,
              })
            },
          }
        },
      ],
      validation: Rule => Rule.required().min(3).max(3),
    }),
  ],
  preview: {
    select: {
      media: 'img',
    },
    prepare: ({ media }) => ({
      title: title,
      media,
      icon,
    }),
  },
});
