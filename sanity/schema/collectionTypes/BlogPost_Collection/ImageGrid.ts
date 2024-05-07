import { defineField } from "sanity";
import { countItems } from "../../../utils/count-items";

const title = 'Siatka ze zdjęciami';
const icon = () => '🖼️';

export default defineField({
  name: 'ImageGrid',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [
        { type: 'image' },
      ],
      title: 'Zdjęcia',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare: ({ images }) => ({
      title: `[${title}] ${countItems(images.length)}`,
      media: images[0],
    }),
  }
});