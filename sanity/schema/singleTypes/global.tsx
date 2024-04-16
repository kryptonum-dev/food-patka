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
      ],
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
      title: 'Numer telefonu',
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
    // {
    //   name: 'CookieConsent',
    //   type: 'CookieConsent',
    //   title: 'Baner z informacją o ciasteczkach',
    // },
  ],
  preview: {
    prepare: () => ({
      title: 'Globalne ustawienia',
    })
  }
})

