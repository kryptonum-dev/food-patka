import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './CommunityTrust.module.scss';
import type { CommunityTrustTypes } from './CommunityTrust.types';

export default function CommunityTrust({ images, title }: CommunityTrustTypes) {
  return (
    <section className={styles['CommunityTrust']}>
      <div className={styles.images}>
        {images.map((img, i) => (
          <Img
            key={i}
            data={img}
            sizes='48px'
          />
        ))}
      </div>
      <Markdown className={styles.title}>{title}</Markdown>
    </section>
  );
}
