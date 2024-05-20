import { defineField, defineType } from "sanity"

export default defineType({
  name: 'Shop_Page',
  type: 'document',
  title: 'Sklep',
  icon: () => '🛒',
  fields: [
    defineField({
      name: 'listing',
      type: 'object',
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
      ],
      title: 'Widok listy wpisów',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'content',
      title: 'Komponenty podstrony',
      options: { collapsible: true },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});
