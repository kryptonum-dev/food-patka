import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Wyróżniona sekcja';
const icon = () => '🌟';

export default defineField({
  name: 'HighlightedSection',
  type: 'object',
  title,
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
      description: 'Domyślnie zdjęcie jest z lewej strony. Jeśli odwrócisz kolejność to zdjęcie będzie po prawej. Tylko jedno uzupełnione pole jest możliwe do uzupełnienia.',
      initialValue: false,
      hidden: ({ parent }) => !parent?.img,
    }),
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie (opcjonalne)',
      fieldset: 'media',
      hidden: ({ parent }) => !!parent?.video,
    }),
    defineField({
      name: 'video',
      type: 'mux.video',
      title: 'Wideo (opcjonalne)',
      fieldset: 'media',
      hidden: ({ parent }) => !!parent?.img,
    }),
  ],
  fieldsets: [
    {
      name: 'media',
      title: 'Zdjęcie lub film',
      description: 'Możesz dodać zdjęcie lub film.',
    }
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'img',
      video: 'video',
    },
    prepare: ({ heading, media, video }) => ({
      title: title,
      subtitle: removeMarkdown(heading),
      media: media,
      icon: () => video ? '🎥' : icon(),
    }),
  }
});
