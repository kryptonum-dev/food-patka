import Markdown from '@/components/ui/markdown';
import sanityFetch from '@/utils/sanity.fetch';
import styles from './CookieConsent.module.scss';
import Content from './_Content';
import type { QueryType } from './CookieConsent.types';

export default async function CookieConsent() {
  let { CookieConsent } = await query();
  CookieConsent = {
    ...CookieConsent,
    heading: <Markdown.h2>{CookieConsent.heading as string}</Markdown.h2>,
    paragraph: <Markdown className={styles.paragraph}>{CookieConsent.paragraph as string}</Markdown>,
    details: {
      ...CookieConsent.details,
      heading: <Markdown.h3>{CookieConsent.details.heading as string}</Markdown.h3>,
      paragraph: <Markdown className={styles.paragraph}>{CookieConsent.details.paragraph as string}</Markdown>,
    },
  };

  return (
    <aside className={styles['CookieConsent']}>
      <Content
        CloseIcon={CloseIcon}
        {...CookieConsent}
      />
    </aside>
  );
}

const CloseIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    viewBox='0 0 20 21'
    fill='none'
  >
    <path
      d='M10 18.833a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666'
      fill='#FFF6F9'
    />
    <path
      d='m12.5 8-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0'
      stroke='#F489A9'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const query = async (): Promise<QueryType> => {
  return await sanityFetch<QueryType>({
    query: /* groq */ `
      *[_id == "global"][0] {
        CookieConsent {
          heading,
          paragraph,
          details {
            heading,
            paragraph,
            necessary[] {
              service,
              cookies[] {
                name,
                description,
                expiry,
                type,
              },
            },
            necessary_Description,
            preferences[] {
              service,
              cookies[] {
                name,
                description,
                expiry,
                type,
              },
            },
            preferences_Description,
            statistical[] {
              service,
              cookies[] {
                name,
                description,
                expiry,
                type,
              },
            },
            statistical_Description,
            marketing[] {
              service,
              cookies[] {
                name,
                description,
                expiry,
                type,
              },
            },
            marketing_Description,
            unclassified[] {
              service,
              cookies[] {
                name,
                description,
                expiry,
                type,
              },
            },
            unclassified_Description,
          },
        },
      }
    `,
    tags: ['global'],
  });
};
