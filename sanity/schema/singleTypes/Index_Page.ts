export default {
  name: 'Index_Page',
  type: 'document',
  title: 'Strona główna',
  icon: () => '🏠',
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
