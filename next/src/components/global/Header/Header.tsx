import sanityFetch from '@/utils/sanity.fetch';
import styles from './Header.module.scss';
import type { HeaderQueryTypes } from './Header.types';
import Markdown from '@/components/ui/markdown';

export default async function Header() {
  const { nav } = await query();

  return (
    <>
      {nav?.annotation && (
        <aside className={styles['Annotation']}>
          <Markdown.p>{nav.annotation}</Markdown.p>
        </aside>
      )}
      <header className={styles['Header']}>
        <nav>linki nagłówek</nav>
      </header>
    </>
  );
}

const query = async (): Promise<HeaderQueryTypes> => {
  return await sanityFetch<HeaderQueryTypes>({
    query: /* groq */ `
      *[_id == 'global'][0] {
        nav {
          annotation,
        },
        socials {
          instagram,
          youtube,
          tiktok,
        },
      }
    `,
    tags: ['global'],
  });
};