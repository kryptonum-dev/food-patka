import { PortableText, type PortableTextReactComponents } from 'next-sanity';
import Img from '@/components/ui/image';
import styles from './PostContent.module.scss';
import type { PostContentTypes } from './PostContent.types';
import ImageGrid, { type ImageGridTypes } from './ImageGrid';
import Quote, { type QuoteTypes } from './Quote';
import OrderedList, { type OrderedListTypes } from './OrderedList';

const components = {
  types: {
    image: ({ value }) => <Img data={value} sizes='' />,
    ImageGrid: ({ value: { images } }: { value: ImageGridTypes }) => <ImageGrid images={images} />,
    Quote: ({ value }: { value: QuoteTypes }) => <Quote {...value} />,
    OrderedList: ({ value }: { value: OrderedListTypes }) => <OrderedList {...value} />,
  }
} as Partial<PortableTextReactComponents>;

export default function PostContent({ content }: PostContentTypes) {
  return (
    <section className={styles['PostContent']}>
      <PortableText
        value={content}
        components={components}
      />
    </section>
  );
}
