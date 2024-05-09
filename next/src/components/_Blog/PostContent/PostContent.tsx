import { PortableText, toPlainText, type PortableTextReactComponents } from 'next-sanity';
import Img from '@/components/ui/image';
import styles from './PostContent.module.scss';
import type { PostContentTypes } from './PostContent.types';
import ImageGrid, { type ImageGridTypes } from './ImageGrid';
import Quote, { type QuoteTypes } from './Quote';
import OrderedList, { type OrderedListTypes } from './OrderedList';
import { slugify } from '@/utils/slugify';

const components = {
  block: {
    h2: ({ value, children }) => <h2 id={slugify(toPlainText(value))}>{children}</h2>,
    h3: ({ value, children }) => <h3 id={slugify(toPlainText(value))}>{children}</h3>,
    largeText: ({ children }) => <p className='h3'>{children}</p>,
  },
  types: {
    image: ({ value }) => <Img data={value} sizes='' />,
    ImageGrid: ({ value: { images } }: { value: ImageGridTypes }) => <ImageGrid images={images} />,
    Quote: ({ value }: { value: QuoteTypes }) => <Quote {...value} />,
    OrderedList: ({ value }: { value: OrderedListTypes }) => <OrderedList {...value} />,
  }
} as Partial<PortableTextReactComponents>;

export default function PostContent({ headings, content }: PostContentTypes) {
  return (
    <section className={styles['PostContent']}>
      <nav>
        <h2 className='h3'>W artykule znajdziesz:</h2>
        <ol>
          {headings.map((heading, i) => (
            <li className={styles.item} key={i}>
              <a href={`#${slugify(toPlainText(heading))}`}>{toPlainText(heading)}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className={styles.content}>
        <PortableText
          value={content}
          components={components}
        />
      </div>
    </section>
  );
}
