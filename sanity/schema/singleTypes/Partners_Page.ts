export default {
  name: 'Partners_Page',
  type: 'document',
  title: 'Partnerzy',
  icon: () => '🤝',
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
