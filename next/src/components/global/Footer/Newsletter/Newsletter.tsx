import Markdown from '@/components/ui/markdown';
import styles from './Newsletter.module.scss';
import type { NewsletterTypes } from './Newsletter.types';
import Form from './_Form';

export default function Newsletter({ data: { heading, paragraph } }: NewsletterTypes) {
  return (
    <aside className={styles['Newsletter']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      <Form />
    </aside>
  );
}
