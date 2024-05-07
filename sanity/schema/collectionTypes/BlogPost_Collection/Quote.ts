import { defineField } from "sanity";
import { removeMarkdown } from "../../../utils/remove-markdown";

const title = 'Cytat';
const icon = () => '❞';

export default defineField({
  name: 'Quote',
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'content',
      type: 'markdown',
      title: 'Treść',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'markdown',
      title: 'Autor',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'content',
      author: 'author',
    },
    prepare: ({ content, author }) => ({
      title: `[${title}] ${removeMarkdown(content)}`,
      subtitle: removeMarkdown(author),
    }),
  }
});