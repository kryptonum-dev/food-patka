import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";
import { countItems } from "../../../utils/count-items";

const title = 'Lista numerowana';
const icon = () => '🔢';

export default defineField({
  name: 'OrderedList',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [
        {
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
              title: 'Paragraf (zalecane)',
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
              paragraph: 'paragraph',
            },
            prepare: ({ heading, paragraph }) => ({
              title: removeMarkdown(heading),
              subtitle: removeMarkdown(paragraph),
            }),
          }
        },
      ],
      title: 'Lista',
    })
  ],
  preview: {
    select: {
      list: 'list',
    },
    prepare: ({ list }) => ({
      title: `[${title}] ${countItems(list.length)}`,
    }),
  }
});