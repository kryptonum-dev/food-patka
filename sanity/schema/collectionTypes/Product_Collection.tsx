import { defineField, defineType } from "sanity";
import { slugify } from "../../utils/slugify";
import { removeMarkdown } from "../../utils/remove-markdown";

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
      type: 'markdown',
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
      name: 'hasVariants',
      type: 'boolean',
      title: 'Czy produkt posiada warianty?',
      description: 'Jeśli produkt posiada warianty, zaznacz tę opcję. Zostaną wyświetlone prawidłowe pola do ich konfiguracji.',
    }),
    defineField({
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Nazwa',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'number',
              title: 'Cena',
              description: 'Główna cena wariantu.',
              validation: Rule => Rule.required(),
              fieldset: 'price',
            }),
            defineField({
              name: 'oldPrice',
              type: 'number',
              title: 'Stara cena (opcjonalnie)',
              description: 'Stara cena zostanie przekreślona.',
              validation: Rule => Rule.custom((value, context) => {
                const price = (context.parent as { price: number }).price;
                if (value! <= price) {
                  return 'Stara cena powinna być wyższa od ceny głównej'
                };
                return true
              }).warning(),
              fieldset: 'price',
            }),
          ],
          fieldsets: [
            {
              name: 'price', title: 'Cena',
              options: { columns: 2 }
            },
          ],
          preview: {
            select: {
              title: 'name',
              price: 'price',
              oldPrice: 'oldPrice',
            },
            prepare: ({ title, price, oldPrice }) => {
              const priceText = price ? `Cena: ${price}zł` : 'Brak ceny';
              const oldPriceText = oldPrice ? `Stara cena: ${oldPrice}zł` : '';
              return {
                title: title,
                subtitle: [priceText, oldPriceText].filter(Boolean).join(' | '),
              }
            },
          },
        }
      ],
      title: 'Warianty',
      description: 'Dodaj warianty produktu, jeśli produkt posiada więcej niż jedną opcję do wyboru.',
      hidden: ({ document }) => !document?.hasVariants,
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Cena',
      description: 'Główna cena produktu.',
      hidden: ({ document }) => !!document?.hasVariants,
      validation: Rule => Rule.custom((value, { document }) => {
        if (!document?.hasVariants && !value) {
          return 'Cena jest wymagana'
        };
        return true
      }),
      fieldset: 'price',
    }),
    defineField({
      name: 'oldPrice',
      type: 'number',
      title: 'Stara cena (opcjonalnie)',
      description: 'Stara cena zostanie przekreślona.',
      hidden: ({ document }) => !!document?.hasVariants,
      validation: Rule => Rule.custom((value, { document }) => {
        const price = document?.price as number;
        if (value! <= price) {
          return 'Stara cena powinna być wyższa od ceny głównej'
        };
        return true
      }).warning(),
      fieldset: 'price',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        { type: 'image' }
      ],
      title: 'Galeria zdjęć',
      description: 'Pierwsze zdjęcie zostanie również wykorzystane jako miniatura.',
      validation: Rule => Rule.required().min(1),
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
      img: 'gallery',
    },
    prepare: ({ title, subtitle, img }) => ({
      title: removeMarkdown(title),
      subtitle: subtitle,
      media: img[0],
      icon,
    }),
  },
  fieldsets: [
    {
      name: 'price', title: 'Cena',
      options: { columns: 2 }
    },
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});