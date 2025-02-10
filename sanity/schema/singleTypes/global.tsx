import { defineField, defineType } from 'sanity';

const OrganizationSchema = [
  defineField({
    name: 'name',
    type: 'string',
    title: 'Nazwa Twojej organizacji',
  }),
  defineField({
    name: 'description',
    type: 'text',
    rows: 3,
    title: 'Opis Twojej organizacji',
  }),
]

const NavLinks = {
  type: 'object',
  title: 'Linki nawigacyjne',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'Link',
      validation: Rule =>
        Rule.custom(value => {
          if (value && (!value.startsWith('/') || value.startsWith('//'))) {
            return 'Link musi byc relatywny';
          }
          return true;
        }).required(),
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Podlinki (opcjonalne)',
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
              name: 'href',
              type: 'string',
              title: 'Link',
              validation: Rule =>
                Rule.custom(value => {
                  if (value && (!value.startsWith('/') || value.startsWith('//'))) {
                    return 'Link musi byc relatywny';
                  }
                  return true;
                }).required(),
            }),
            defineField({
              name: 'img',
              type: 'image',
              title: 'Zdjęcie',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
              media: 'img',
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'href',
    }
  }
};

export const global = defineType({
  name: 'global',
  type: 'document',
  title: 'Globalne',
  icon: () => '🌍',
  fields: [
    defineField({
      name: 'nav',
      type: 'object',
      title: 'Nawigacja',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'annotation',
          type: 'markdown',
          title: 'Adnotacja',
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Linki',
          of: [NavLinks],
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Stopka',
      options: { collapsible: true, collapsed: true },
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
      ],
    }),
    defineField({
      name: 'privacyPolicy',
      type: 'url',
      title: 'Polityka Prywatności',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'termsAndConditions',
      type: 'url',
      title: 'Regulamin',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Adres e-mail',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Numer telefonu (opcjonalnie)',
    }),
    defineField({
      name: 'socials',
      type: 'object',
      title: 'Social media',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
          validation: Rule => Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'tiktok',
          type: 'url',
          title: 'TikTok',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
      ],
    }),
    defineField({
      name: 'RecentPurchases',
      type: 'object',
      title: 'Ostatnie zamówienia',
      description: 'Pokazuje element „X osób kupiło ten produkt w ciągu 24 godzin”. Liczba dla każdego produktu jest generowana losowo z zakresu min-max.',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'min',
          type: 'number',
          title: 'Minimalna liczba zakupów',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'max',
          type: 'number',
          title: 'Maksymalna liczba zakupów',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        defineField({
          name: 'og_Img',
          type: 'image',
          title: 'OG Image',
          description:
            'Zdjęcie, które jest widoczne przy udostępnianiu strony w mediach społecznościowych. Wymiary zdjęcia powinny mieć 1200x630px',
        }),
      ],
    }),
    defineField({
      name: 'OrganizationSchema',
      type: 'object',
      title: 'Uporządkowane dane organizacji',
      description: (
        <a
          href="https://developers.google.com/search/docs/appearance/structured-data/organization?hl=pl"
          target="_blank"
          rel="noreferrer"
        >
          Więcej informacji o Schema
        </a>
      ),
      fields: OrganizationSchema,
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'isPromoCodeAfterPurchase',
      type: 'boolean',
      title: 'Czy wysyłać kod 10% promocyjny po udanym zakupie z koszyka EasyCart?',
      description: 'Jeśli zaznaczysz tą opcje, każda osoba, która zakupi produkt z koszyka EasyCart, otrzyma jednorazowy kod rabatowy 10% na kolejne zakupy',
    })
  ],
  preview: {
    prepare: () => ({
      title: 'Globalne ustawienia',
    })
  }
})

