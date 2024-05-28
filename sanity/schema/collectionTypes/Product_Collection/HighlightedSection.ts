import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Wyróżniona sekcja';
const icon = () => '🌟';

export default defineField({
  name: 'HighlightedSection',
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
      name: 'isReversed',
      type: 'boolean',
      title: 'Czy odwrócić kolejność?',
      description: 'Domyślnie zdjęcie jest z lewej strony. Jeśli odwrócisz kolejność to zdjęcie będzie po prawej.',
      initialValue: false,
      hidden: ({ parent }) => !parent?.img,
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
      media: media,
    }),
  }
});