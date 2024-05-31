import { defineField } from 'sanity';
import { removeMarkdown } from '../../utils/remove-markdown';

const title = 'Wyróżnione produkty';
const icon = () => '🌟';

export default defineField({
  name: 'FeaturedProducts',
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
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'Product_Collection' },
        },
      ],
      title: 'Lista produktów',
      description: 'Wybierz 3 produkty, które chcesz wyróżnić. Sekcja może służyć jako upsell.',
      validation: Rule => Rule.required().unique().max(3),
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
