import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './HeaderImageAndFeautures.module.scss';
import type { HeaderImageAndFeauturesTypes } from './HeaderImageAndFeautures.types';

export default function HeaderImageAndFeautures({ index, heading, img, list }: HeaderImageAndFeauturesTypes) {
  const Heading = index === 0 ? Markdown.h1 : Markdown.h2;

  return (
    <section className={styles['HeaderImageAndFeautures']}>
      <header>
        <Heading>{heading}</Heading>
      </header>
      <ul className={styles.list}>
        {list?.map(({ heading, paragraph }, i) => (
          <li className={styles.item} key={i}>
            <Markdown.h3>{heading}</Markdown.h3>
            <Markdown>{paragraph}</Markdown>
          </li>
        ))}
      </ul>
      <div className={styles.img}>
        <Img data={img} sizes='500px' priority={index === 0} />
        <Stars1 className={styles.Stars1} />
        <Stars2 className={styles.Stars2} />
        <Stars3 className={styles.Stars3} />
        <Arrow className={styles.Arrow} />
      </div>
    </section>
  );
}

const Stars1 = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={78}
    height={77}
    viewBox='0 0 78 77'
    fill='#FFB8CE'
    {...props}
  >
    <path d='M8 73a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' />
    <path d='M42.712 1.776c.127-1.074 1.687-1.074 1.814 0l1.07 9.016a25.367 25.367 0 0 0 22.202 22.201l9.015 1.07c1.075.128 1.075 1.687 0 1.815l-9.016 1.07a25.367 25.367 0 0 0-22.2 22.2l-1.07 9.016c-.128 1.075-1.688 1.075-1.815 0l-1.07-9.015a25.367 25.367 0 0 0-22.201-22.202l-9.016-1.07c-1.075-.127-1.075-1.686 0-1.814l9.016-1.07a25.367 25.367 0 0 0 22.201-22.201l1.07-9.016Z' />
  </svg>
);

const Stars2 = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={47}
    height={47}
    viewBox='0 0 47 47'
    fill='#FFB8CE'
    {...props}
  >
    <path d='M22.448.936c.086-.727 1.141-.727 1.227 0l.724 6.099a17.16 17.16 0 0 0 15.018 15.018l6.1.724c.726.086.726 1.141 0 1.228l-6.1.723A17.16 17.16 0 0 0 24.4 39.747l-.724 6.099c-.086.727-1.14.727-1.227 0l-.724-6.1A17.16 17.16 0 0 0 6.706 24.729l-6.1-.723c-.726-.087-.726-1.142 0-1.228l6.1-.724A17.16 17.16 0 0 0 21.724 7.035z' />
  </svg>
);

const Stars3 = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={85}
    height={57}
    viewBox='0 0 85 57'
    fill='#F489A9'
    {...props}
  >
    <path d='M85 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z' />
    <path d='M15.23 27.331c.056-.474.744-.474.8 0l.472 3.978a11.191 11.191 0 0 0 9.795 9.794l3.977.472c.474.056.474.744 0 .8l-3.977.473a11.191 11.191 0 0 0-9.795 9.794l-.472 3.978c-.056.474-.744.474-.8 0l-.472-3.978a11.191 11.191 0 0 0-9.795-9.794l-3.978-.472c-.474-.056-.474-.744 0-.8l3.978-.473a11.191 11.191 0 0 0 9.795-9.794l.472-3.978Z' />
  </svg>
);

const Arrow = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={198}
    height={134}
    viewBox='0 0 198 134'
    fill='none'
    stroke='#FFD7E4'
    strokeWidth={3}
    {...props}
  >
    <path d='M2.35.07C1.102 56.566 35.66 70.61 61.657 67.104m0 0c23.72-3.199 40.311-21.007 16.083-34.513-12.661-7.06-19.365 11.532-16.083 34.513Zm0 0c5.805 40.636 42.834 94.997 133.358 45.548' />
    <path
      d='m183 108 13 4-3.5 13.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);