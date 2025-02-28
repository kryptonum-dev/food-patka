import { defineField, defineType } from "sanity";
import { slugify } from "../../../utils/slugify";
import { removeMarkdown } from "../../../utils/remove-markdown";
import CommunityTrust from "./CommunityTrust";
import HighlightedSection from "./HighlightedSection";
import OrderedList from "./OrderedList";
import InfoTile from "./InfoTile";
import YummyWishes from "./YummyWishes";

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
      name: 'category',
      type: 'reference',
      to: [
        { type: 'ProductCategory_Collection' }
      ],
      title: 'Kategoria',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hasVariants',
      type: 'boolean',
      title: 'Czy produkt posiada warianty?',
      description: 'Jeśli produkt posiada warianty, zaznacz tę opcję. Zostaną wyświetlone prawidłowe pola do ich konfiguracji.',
      initialValue: false,
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link do produktu w EasyCart',
      description: (
        <>
          Pełny link do produktu w{' '}
          <a href='https://app.easycart.pl/admin/products' target='_blank' rel='noreferrer'>EasyCart</a>. Powinien wyglądać następująco: <b>https://app.easycart.pl/checkout/food-patka/***</b>.
        </>
      ),
      hidden: ({ document }) => document?.hasVariants as boolean,
      validation: Rule => Rule.custom((value, context) => {
        if (!context.document?.hasVariants && !value) {
          return 'Link do produktu jest wymagany'
        };
        return true
      }),
    }),
    defineField({
      name: 'url_woocommerce',
      type: 'url',
      title: 'Link do produktu w WooCommerce (opcjonalnie)',
      description: (
        <>
          Link do dodania produktu do koszyka w WooCommerce (sklep.foodpatka.pl). Przykładowy link: <b>https://sklep.foodpatka.pl/?add-to-cart=XXX</b>, gdzie XXX to ID produktu. <a href="https://www.wpbeginner.com/beginners-guide/how-to-find-product-id-in-woocommerce-beginners-guide/" target="_blank" rel="noreferrer">Poradnik jak znaleźć ID produktu w WooCommerce.</a>
        </>
      ),
      hidden: ({ document }) => document?.hasVariants as boolean,
    }),
    defineField({
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Link do produktu w EasyCart',
              description: (
                <>
                  Pełny link do produktu w{' '}
                  <a href='https://app.easycart.pl/admin/products' target='_blank' rel='noreferrer'>EasyCart</a>. Powinien wyglądać następująco: <b>https://app.easycart.pl/checkout/food-patka/***</b>.
                </>
              ),
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'url_woocommerce',
              type: 'url',
              title: 'Link do produktu w WooCommerce',
              description: (
                <>
                  Link do dodania produktu do koszyka w WooCommerce (sklep.foodpatka.pl). Przykładowy link: <b>https://sklep.foodpatka.pl/?add-to-cart=XXX</b>, gdzie XXX to ID produktu. <a href="https://www.wpbeginner.com/beginners-guide/how-to-find-product-id-in-woocommerce-beginners-guide/" target="_blank" rel="noreferrer">Poradnik jak znaleźć ID produktu w WooCommerce.</a>
                </>
              ),
              validation: Rule => Rule.required(),
            }),
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
            defineField({
              name: 'omnibus',
              type: 'number',
              title: 'Najniższa cena z ostatnich 30 dni',
              description: (
                <>
                  Za sprawą <a href='https://www.parp.gov.pl/component/content/article/82715:dyrektywa-omnibus-obowiazek-informowania-o-cenach' target='_blank' rel='noreferrer'>dyretywy Omnibus</a> należy wprowadzić najniższą cenę produktu z ostatnich 30 dni.
                </>
              ),
              validation: Rule => Rule.required(),
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
              omnibus: 'omnibus',
            },
            prepare: ({ title, price, oldPrice, omnibus }) => {
              const priceText = price ? `Cena: ${price}zł` : 'Brak ceny';
              const oldPriceText = oldPrice ? `Stara cena: ${oldPrice}zł` : '';
              const omnibusText = omnibus ? `Omnibus: ${omnibus}zł` : '';
              return {
                title: title,
                subtitle: [priceText, oldPriceText, omnibusText].filter(Boolean).join(' | '),
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
      name: 'omnibus',
      type: 'number',
      title: 'Najniższa cena z ostatnich 30 dni',
      description: (
        <>
          Za sprawą <a href='https://www.parp.gov.pl/component/content/article/82715:dyrektywa-omnibus-obowiazek-informowania-o-cenach' target='_blank' rel='noreferrer'>dyretywy Omnibus</a> należy wprowadzić najniższą cenę produktu z ostatnich 30 dni.
        </>
      ),
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
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
              title: 'Normalny',
              value: 'normal',
            },
            {
              title: 'Duży tekst',
              value: 'largeText',
              component: ({ children }) => <span style={{ fontWeight: 400, fontSize: '1.2em' }} >{children}</span>,
            },
            {
              title: 'Nagłówek H2',
              value: 'h2',
              component: ({ children }) => <span style={{ fontWeight: 400, fontSize: '1.618em' }} >{children}</span>,
            },
            {
              title: 'Nagłówek H3',
              value: 'h3',
              component: ({ children }) => <div style={{ fontWeight: 400, fontSize: '1.4em' }} >{children}</div>,
            },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          }
        },
        { type: 'image', title: 'Zdjęcie', validation: Rule => Rule.required() },
        CommunityTrust,
        HighlightedSection,
        OrderedList,
        InfoTile,
        YummyWishes,
      ],
      title: 'Opis produktu',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'content',
      title: 'Komponenty podstrony',
      description: 'Możesz dodać dodatkowe komponenty do postrony. Wyświetlą się one poniżej opisu produktu.',
      options: { collapsible: true },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
    defineField({
      name: 'analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'item_name',
          type: 'string',
          title: 'Nazwa produktu z EasyCart',
          description: 'Główna nazwa produktu z panelu EasyCart.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'item_id',
          type: 'string',
          title: 'ID produktu',
          description: 'ID produktu z EasyCart. Znajdziesz go w linku (adresie URL) podczas edycji produktu w panelu EasyCart. Przykład: f89a1a56-7b42-4578-a103-f4aa482c664c.',
          validation: Rule => Rule.required(),
        }),
      ],
      title: 'Analityka',
      group: 'analytics',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
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
    {
      name: 'analytics',
      title: 'Analytics',
    },
  ],
});
