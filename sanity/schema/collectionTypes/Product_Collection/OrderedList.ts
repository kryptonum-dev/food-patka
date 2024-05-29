import { defineField } from "sanity";
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
        { type: 'markdown' }
      ],
      title: 'Lista',
    }),
  ],
  preview: {
    select: {
      list: 'list',
    },
    prepare: ({ list }) => ({
      title: title,
      subtitle: countItems(list.length),
      icon,
    }),
  }
});