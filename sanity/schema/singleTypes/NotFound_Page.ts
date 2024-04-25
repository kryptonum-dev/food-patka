export default {
  name: 'NotFound_Page',
  type: 'document',
  title: 'Nie znaleziono strony',
  icon: () => '❌',
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
