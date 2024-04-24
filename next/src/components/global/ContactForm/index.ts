import { ImgDataQuery } from '@/components/ui/image';
import ContactForm from './ContactForm';
export default ContactForm;
export type { ContactFormTypes } from './ContactForm.types';

export const ContactForm_Query = `
  _type == "ContactForm" => {
    isHighlighted,
    heading,
    paragraph,
    img {
      ${ImgDataQuery}
    },
  },
`;
