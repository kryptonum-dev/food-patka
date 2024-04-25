import { defineField, defineType } from "sanity";

export default defineType({
  name: 'Blog_Page',
  type: 'document',
  title: 'Blog',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'listing',
      type: 'object',
      title: 'Widok listy wpisów',
      fields: [
        defineField({
          name: 'heading',
          type: 'markdown',
          title: 'Nagłówek',
        }),
        defineField({
          name: 'paragraph',
          type: 'markdown',
          title: 'Paragraf',
        }),
      ],
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