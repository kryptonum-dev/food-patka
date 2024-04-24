export default {
  name: 'Contact_Page',
  type: 'document',
  title: 'Kontakt',
  icon: () => '📧',
  fields: [
    {
      name: 'content',
      type: 'content',
      title: 'Komponenty podstrony',
      options: { collapsible: true },
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    },
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
};
