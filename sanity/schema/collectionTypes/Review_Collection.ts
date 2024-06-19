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
      name: 'visible',
      type: 'boolean',
      title: 'Czy recencja widoczna?',
      description: 'Zaznacz, jeśli recenzja ma być widoczna na stronie.',
      validation: Rule => Rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Imię',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      title: 'Ocena',
      validation: Rule => Rule.required(),
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
  ],
  preview: {
    select: {
      name: 'name',
      rating: 'rating',
      content: 'content',
      visible: 'visible',
      product: 'product.name',
    },
    prepare: ({ name, rating, visible, product }) => ({
      title: `${name} ocenił/a ${removeMarkdown(product)}`,
      subtitle: visible ? 'Zatwierdzone' : 'Niezatwierdzone',
      media: () => `${rating}/5`,
    }),
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});