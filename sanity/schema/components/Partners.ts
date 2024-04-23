import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Partnerzy';
const icon = () => '🤝';

export default defineField({
  name: 'Partners',
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
          type: 'reference',
          to: [
            { type: 'Partners_Collection' }
          ]
        }
      ],
      title: 'Lista partnerów',
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
