import { defineField, defineType } from 'sanity';

export default defineType({
  name: "CookieConsent",
  type: "object",
  title: 'Baner z informacją o ciasteczkach',
  icon: () => '🍪',
  options: {
    collapsible: true,
    collapsed: true,
  },
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
      name: 'details',
      type: 'CookieConsent_Details',
      title: 'Szczegóły',
      validation: Rule => Rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
});

export const CookieConsent_Details = defineType({
  name: "CookieConsent_Details",
  type: "object",
  title: 'Szczegóły',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Nagłówek',
    }),
    defineField({
      name: 'paragraph',
      type: 'text',
      rows: 5,
      title: 'Paragraf',
    }),
    defineField({
      name: 'necessary',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List'
        },
      ],
      title: 'Lista',
      fieldset: 'necessary',
    }),
    defineField({
      name: 'necessary_Description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
      fieldset: 'necessary',
    }),
    defineField({
      name: 'preferences',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List'
        },
      ],
      title: 'Lista',
      fieldset: 'preferences',
    }),
    defineField({
      name: 'preferences_Description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
      fieldset: 'preferences',
    }),
    defineField({
      name: 'statistical',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List'
        },
      ],
      title: 'Lista',
      fieldset: 'statistical',
    }),
    defineField({
      name: 'statistical_Description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
      fieldset: 'statistical',
    }),
    defineField({
      name: 'marketing',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List'
        },
      ],
      title: 'Lista',
      fieldset: 'marketing',
    }),
    defineField({
      name: 'marketing_Description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
      fieldset: 'marketing',
    }),
    defineField({
      name: 'unclassified',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List'
        },
      ],
      title: 'Lista',
      fieldset: 'unclassified',
    }),
    defineField({
      name: 'unclassified_Description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
      fieldset: 'unclassified',
    }),
  ],
  fieldsets: [
    {
      name: 'necessary',
      title: 'Niezbędne',
    },
    {
      name: 'statistical',
      title: 'Statystyka',
    },
    {
      name: 'marketing',
      title: 'Marketing',
    },
    {
      name: 'preferences',
      title: 'Preferencje',
    },
    {
      name: 'unclassified',
      title: 'Nieklasyfikowane',
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title,
        description: description
      }
    }
  }
});

export const CookieConsent_Details_List = defineType({
  name: "CookieConsent_Details_List",
  type: "object",
  fields: [
    defineField({
      name: 'service',
      type: 'string',
      title: 'Usługa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cookies',
      type: 'array',
      of: [
        {
          type: 'CookieConsent_Details_List_Cookies',
        }
      ],
      title: 'Ciasteczka',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      service: 'service',
      cookies: 'cookies',
    },
    prepare({ service, cookies }) {
      return {
        title: service,
        subtitle: `${cookies.length || 0} ciasteczek`,
      }
    }
  }
});

export const CookieConsent_Details_List_Cookies = defineType({
  name: "CookieConsent_Details_List_Cookies",
  type: "object",
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 5,
      title: 'Opis',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expiry',
      type: 'string',
      title: 'Data ważności:',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Rodzaj:',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      description: 'description',
    },
    prepare({ name, description }) {
      return {
        title: name,
        subtitle: description,
      }
    }
  }
});