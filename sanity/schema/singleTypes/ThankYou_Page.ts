import { defineField, defineType } from "sanity";

export default defineType({
  name: 'ThankYou_Page',
  type: 'document',
  title: 'Strona podziękowania po zakupie',
  icon: () => '🙏',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({
          name: 'img',
          type: 'image',
          title: 'Zdjęcie',
          validation: Rule => Rule.required(),
        }),
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
        defineField({
          name: 'cta',
          type: 'cta',
          title: 'Wezwanie do działania',
        }),
      ],
      title: 'Sekcja Hero',
      validation: Rule => Rule.required(),
      options: { collapsible: true },
    }),
    defineField({
      name: 'promo',
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
        defineField({
          name: 'cta',
          type: 'cta',
          title: 'Wezwanie do działania',
        }),
        defineField({
          name: 'expiry',
          type: 'number',
          title: 'Po ilu dniach ma wygasnąć kod zniżkowy? (opcjonalnie)',
          description: 'Wpisz liczbę dni, po których ma wygasnąć kod zniżkowy. Jeśli chcesz, aby kod zniżkowy nie miał daty ważności, zostaw to pole puste.',
          validation: Rule => Rule.integer().positive(),
        }),
      ],
      title: 'Kod zniżkowy',
      options: { collapsible: true, collapsed: true },
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