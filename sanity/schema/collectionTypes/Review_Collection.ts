import { defineField, defineType } from "sanity";
import { removeMarkdown } from "../../utils/remove-markdown";

const title = 'Zbiór opinii';
const icon = () => '👍';

export default defineType({
  name: 'Review_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Imię',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'string',
      options: {
        list: ['1', '2', '3', '4', '5']
      },
      title: 'Ocena',
      validation: Rule => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'product',
      type: 'reference',
      to: [
        { type: 'Product_Collection' },
      ],
      options: {
        disableNew: true,
      },
      title: 'Produkt',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'markdown',
      title: 'Treść',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        { type: 'image' }
      ],
      title: 'Zdjęcia (opcjonalne)',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      rating: 'rating',
      content: 'content',
      gallery: 'gallery',
    },
    prepare: ({ name, rating, content, gallery }) => ({
      title: `${name} ocenił/a na ${rating}/5 gwiazdek`,
      subtitle: removeMarkdown(content),
      media: gallery && gallery[0],
      icon,
    }),
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});