import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './Partners.module.scss';
import type { PartnersTypes } from './Partners.types';

export default function Partners({ heading, list }: PartnersTypes) {
  return (
    <section className={styles['Partners']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
      </header>
      <ul className={styles.list}>
        {list?.map(({ logo, name, href }, i) => (
          <li
            key={i}
            className={styles.item}
            aria-label={name}
          >
            {href ? (
              <a
                className={styles.container}
                href={href}
                target='_blank'
                rel='noreferrer'
              >
                <Img data={logo} sizes='' />
              </a>
            ) : (
              <div className={styles.container}>
                <Img data={logo} sizes='' />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
