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
      initialValue: [
        { _type: 'image', asset: { _type: 'reference', _ref: 'image-a3262b2762d9bd3479d8424842514f688fb4f23c-96x96-webp' } },
        { _type: 'image', asset: { _type: 'reference', _ref: 'image-8d5f9ec4a0f62db889609461bee4e9f4baf291be-96x96-webp' } },
        { _type: 'image', asset: { _type: 'reference', _ref: 'image-16cfa59ee8024213a3d35a4737cba5bac71841f4-96x96-webp' } },
        { _type: 'image', asset: { _type: 'reference', _ref: 'image-3487268b9c7f6da5f82275a4e026fda0a2b59180-96x96-webp' } },
      ],
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