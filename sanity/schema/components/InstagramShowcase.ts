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
