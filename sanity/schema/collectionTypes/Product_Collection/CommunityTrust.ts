import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Zaufanie społecznościowe';
const icon = () => '🤝';

export default defineField({
  name: 'CommunityTrust',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [
        { type: 'image' }
      ],
      title: 'Zdjęcia',
      description: 'Zdjęcia osób, które zaufały marce. Minumum 2 zdjęcia, maksimum 4 zdjęcia.',
      validation: Rule => Rule.required().min(2).max(4),
    }),
    defineField({
      name: 'title',
      type: 'markdown',
      title: 'Krótki tytuł',
      description: 'Pogrubiony tekst zostanie wyświetlony jako większy oraz zrobi miejsce dla nowej linii.',
      initialValue: '**Ponad 15 000** osób gotuje z moimi przepisami',
      validation: Rule => Rule.required(),
    })
  ],
  preview: {
    select: {
      images: 'images',
      subtitle: 'title',
    },
    prepare: ({ images, subtitle }) => ({
      title: title,
      subtitle: removeMarkdown(subtitle),
      media: images[0],
    }),
  }
});