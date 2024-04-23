import Markdown from '@/components/ui/markdown';
import List from './_List';
import styles from './Faq.module.scss';
import type { FaqTypes } from './Faq.types';

export default function Faq({ heading, paragraph, list }: FaqTypes) {
  const _list = list.map(({ question, answer }) => ({
    question: <Markdown.h3>{question}</Markdown.h3>,
    answer: <Markdown className={styles.answerMarkdown}>{answer}</Markdown>,
  }));

  return (
    <section className={styles['Faq']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      <List list={_list} />
    </section>
  );
}
