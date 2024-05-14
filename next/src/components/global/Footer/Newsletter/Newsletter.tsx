import Markdown from '@/components/ui/markdown';
import styles from './Newsletter.module.scss';
import Form from './_Form';
import getLegalLink from '@/components/ui/get-legal-link';
import type { NewsletterTypes } from './Newsletter.types';

export default async function Newsletter({ data: { heading, paragraph } }: NewsletterTypes) {
  return (
    <aside className={styles['Newsletter']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      <Form privacyPolicyLink={((await getLegalLink()).privacyPolicy)} />
    </aside>
  );
}
