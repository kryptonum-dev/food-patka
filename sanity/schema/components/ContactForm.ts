import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Formularz kontaktowy';
const icon = () => '📧';

export default defineField({
  name: 'ContactForm',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'isHighlighted',
      type: 'boolean',
      title: 'Czy wyróżnić?',
      description: 'Jeśli ta sekcja zostanie ustawiona jako wyróżniona, dodane zostanie do niej tło.',
      initialValue: false,
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
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie (opcjonalne)',
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
