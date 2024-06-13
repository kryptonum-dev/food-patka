
import Description from './Description';
import Gallery from './Gallery';
import Info from './Info';
import styles from './Product.module.scss';
import type { ProductTypes } from './Product.types';

export default function Product({
  name,
  url,
  hasVariants,
  variants,
  cheapestVariant,
  price,
  oldPrice,
  omnibus,
  currentVariantParam,
  gallery,
  description,
  content_id,
  content_name,
}: Omit<ProductTypes, 'category'>) {
  return (
    <section className={styles['Product']}>
      <Gallery
        className={styles.Gallery}
        data={gallery}
        ArrowLeftIcon={ArrowLeftIcon}
        ArrowRightIcon={ArrowRightIcon}
      />
      <Info
        className={styles.Info}
        content_id={content_id}
        content_name={content_name}
        {...{
          name,
          url,
          hasVariants,
          variants,
          cheapestVariant,
          price,
          oldPrice,
          omnibus,
          currentVariantParam
        }}
      />
      <Description
        className={styles.Description}
        description={description}
      />
    </section>
  );
}

const ArrowLeftIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={25}
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      d='M5.586 13.195h-.15l.106.107 5.477 5.463a.69.69 0 0 1-.222 1.122.69.69 0 0 1-.75-.148L3.29 12.997a.69.69 0 0 1 0-.973l6.741-6.758a.688.688 0 1 1 .974.972L5.54 11.714l-.106.106h.15l14.69-.018a.688.688 0 1 1 .002 1.376z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
const ArrowRightIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={25}
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      d='M19.414 13.18h.15l-.106.106-5.463 5.476a.689.689 0 0 0 .974.972l6.741-6.758a.686.686 0 0 0 0-.973L14.95 5.26a.688.688 0 0 0-.972.974l5.477 5.463.107.107h-.15l-14.69.018a.687.687 0 0 0 .001 1.374l14.69-.017Z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);