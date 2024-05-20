import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Ostatnie posty blogowe';
const icon = () => '🗞️';

export default defineField({
  name: 'LatestBlogEntries',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'markdown',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
      initialValue: 'Blog pełen treści o **zdrowej diecie**',
    }),
    defineField({
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraf',
      validation: Rule => Rule.required(),
      initialValue: 'Masz ochotę na trochę wiedzy o zdrowym żywieniu? Sprawdź artykuły, które dla Ciebie przygotowałam!',
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
