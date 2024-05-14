import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './ContactForm.module.scss';
import SocialMedia from '../SocialMedia';
import Form from './_Form';
import type { ContactFormTypes } from './ContactForm.types';
import getLegalLink from '@/components/ui/get-legal-link';

export default async function ContactForm({ index, isHighlighted, heading, paragraph, img }: ContactFormTypes) {
  const Heading = index === 0 ? Markdown.h1 : Markdown.h2;

  return (
    <section
      className={`${styles['ContactForm']} sec-wo-margin`}
      data-highlighted={isHighlighted}
    >
      <header>
        <Heading>{heading}</Heading>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
        <SocialMedia />
        {img && <Img data={img} sizes='307px' priority={index === 0} />}
      </header>
      <Form privacyPolicyLink={(await getLegalLink()).termsAndConditions} />
      {isHighlighted && (
        <>
          <WaveTop className={styles.WaveTop} />
          <WaveBottom className={styles.WaveBottom} />
        </>
      )}
    </section>
  );
}


const WaveTop = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={1366}
    height={148}
    viewBox='0 0 1366 148'
    preserveAspectRatio='none'
    fill='none'
    {...props}
  >
    <path
      d='M1368 70.005C1252.58-16 1122.83 60.009 1015.72 88.848c-84.326 22.701-162.197 71.398-489.793-31.843C198.331-46.237 37.477 13.988-2 57.005v90.685h1370z'
      fill='#FFF6F9'
    />
  </svg>
);

const WaveBottom = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={1366}
    height={157}
    viewBox='0 0 1366 157'
    preserveAspectRatio='none'
    fill='none'
    {...props}
  >
    <path
      d='M1368 .67v146.001c-130.4 59.368-207.68-170.302-487-53.69-206 85.999-321.797-146.453-582-32-122.326 53.805-292.667 15.192-301 0V.67z'
      fill='#FFF6F9'
    />
  </svg>
);