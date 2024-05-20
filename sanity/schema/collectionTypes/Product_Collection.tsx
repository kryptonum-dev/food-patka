import { defineField, defineType } from "sanity";
import { slugify } from "../../utils/slugify";

const title = 'Sklep – Produkty';
const icon = () => '📦';

export default defineType({
  name: 'Product_Collection',
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
      name: 'url',
      type: 'url',
      title: 'Link do produktu',
      description: (
        <>
          Link do produktu w{' '}
          <a href='https://app.easycart.pl/admin/products' target='_blank' rel='noreferrer'>EasyCart</a>. Powinien wyglądać tak: <b>https://app.easycart.pl/checkout/food-patka/***</b>.
        </>
      ),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'ProductCategory_Collection' }],
      title: 'Kategoria',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'header',
      type: 'object',
      options: { collapsible: true },
      validation: Rule => Rule.required(),
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
      ]
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
    },
    prepare: ({ title, subtitle }) => ({
      title: title,
      subtitle: subtitle,
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