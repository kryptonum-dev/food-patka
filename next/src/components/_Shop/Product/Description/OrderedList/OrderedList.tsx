import Markdown from '@/components/ui/markdown';
import styles from './OrderedList.module.scss';
import type { OrderedListTypes } from './OrderedList.types';

export default function OrderedList({ list }: OrderedListTypes) {
  return (
    <ol className={styles['OrderedList']}>
      {list.map((item, i) => (
        <li className={styles.item} key={i}>
          <DecorationIcon index={++i} className={styles.DecorationIcon} />
          <Markdown.p>{item}</Markdown.p>
        </li>
      ))}
    </ol>
  );
}


const DecorationIcon = ({ index, ...props }: { index: number } & React.SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    viewBox='0 0 36 36'
    fill='currentColor'
    {...props}
  >
    <path
      d='M18 36a5.455 5.455 0 0 1-5.427-4.899A5.455 5.455 0 0 1 4.9 23.427a5.455 5.455 0 0 1 0-10.854A5.455 5.455 0 0 1 12.573 4.9a5.455 5.455 0 0 1 10.854 0 5.455 5.455 0 0 1 7.674 7.674 5.455 5.455 0 0 1 0 10.854 5.455 5.455 0 0 1-7.674 7.674A5.455 5.455 0 0 1 18 36'
      fill='#FFD7E4'
    />
    <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{index}</text>
  </svg>
);