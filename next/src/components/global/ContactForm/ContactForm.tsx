import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './ContactForm.module.scss';
import SocialMedia from '../SocialMedia';
import Form from './_Form';
import type { ContactFormTypes } from './ContactForm.types';

export default async function ContactForm({ index, isHighlighted, heading, paragraph, img }: ContactFormTypes) {
  const Heading = index === 0 ? Markdown.h1 : Markdown.h2;

  return (
    <section
      className={styles['ContactForm']}
      data-highlighted={isHighlighted}
    >
      <header>
        <Heading>{heading}</Heading>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
        <SocialMedia />
        {img && <Img data={img} sizes='' />}
      </header>
      <Form />
    </section>
  );
}