import { defineField, defineType } from "sanity";

const title = 'Zbiór partnerów';
const icon = () => '🤝';

export default defineType({
  name: 'Partners_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'url',
      title: 'Link (opcjonalnie)',
      validation: Rule => Rule.required().uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)')
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'href',
      media: 'logo'
    },
  },
});