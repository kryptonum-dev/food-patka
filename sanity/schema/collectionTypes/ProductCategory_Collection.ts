import { defineField, defineType } from "sanity";
import { slugify } from "../../utils/slugify";

const title = 'Sklep – Kategorie';
const icon = () => '📂';

export default defineType({
  name: 'ProductCategory_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Slug, to unikalny ciąg znaków, który znajdziemy zazwyczaj po ukośniku w adresie URL podstrony. Dzięki niemu jego forma jest zrozumiała dla użytkowników.',
      options: {
        source: 'name',
        slugify: input => `${slugify(input)}`,
      },
      validation: Rule =>
        Rule.custom(slug => {
          if (!slug?.current) return true;
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return 'Slug może zawierać tylko małe litery, cyfry oraz łączniki. Upewnij się, że nie zawiera on znaków specjalnych ani wielkich liter.';
          }
          return true;
        }).required(),
    }),
    defineField({
      type: 'boolean',
      name: 'isSubcategory',
      title: 'Czy jest podkategorią?',
      description: 'Zaznacz, jeśli utworzona kategoria, ma być subkategorią dla głównej kategorii.',
      fieldset: 'subcategory',
    }),
    defineField({
      name: 'mainCategory',
      type: 'reference',
      to: [
        { type: 'ProductCategory_Collection' }
      ],
      options: {
        filter: ({ document }) => {
          return {
            filter: 'isSubcategory == $isSubcategory',
            params: {
              isSubcategory: !document?.isSubcategory
            }
          }
        }
      },
      title: 'Główna kategoria',
      hidden: ({ document }) => !document?.isSubcategory,
      validation: Rule => Rule.custom((value, { document }) => {
        if (!value && document?.isSubcategory) return 'Główna kategoria musi być uzupełniona.';
        return true;
      }),
      fieldset: 'subcategory',
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Miniatura',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'header',
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
      title: 'Nagłówek',
      options: { collapsible: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'thumbnail',
      isSubcategory: 'isSubcategory',
    },
    prepare: ({ title, subtitle, media, isSubcategory }) => ({
      title: `${title}${isSubcategory ? ` (Jako subkategoria)` : ''}`,
      subtitle: subtitle,
      icon,
      media,
    }),
  },
  fieldsets: [
    {
      name: 'subcategory',
      title: 'Podkategoria',
      options: { collapsible: true },
    }
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});