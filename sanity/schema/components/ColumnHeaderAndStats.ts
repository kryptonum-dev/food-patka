import { defineField, defineType } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Sekcja kolumna z nagłówkiem i statystykami';
const icon = () => '📈';

export default defineField({
  name: 'ColumnHeaderAndStats',
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
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraf',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania (opcjonalnie)',
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
              name: 'number',
              type: 'number',
              title: 'Liczba',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Etykieta',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Ikona',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label',
              media: 'icon',
            },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle,
              media,
            }),
          },
        },
      ],
      validation: Rule => Rule.max(3),
      title: 'Lista statystyk',
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
