'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASING } from '@/global/constants';
import styles from './Faq.module.scss';
import type { ListTypes } from './Faq.types';

export default function List({ list }: ListTypes) {
  const [opened, setOpened] = useState(0);
  const handleClick = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.preventDefault();
    setOpened(i === opened ? -1 : i);
  };

  return (
    <div className={styles.list}>
      {list?.map(({ question, answer }, i) => (
        <details
          key={i}
          open
          data-opened={opened === i}
        >
          <summary
            onClick={(e) => handleClick(e, i)}
            tabIndex={opened === i ? -1 : 0}
          >
            {question}
            <div className={styles.indicator}>
              <span></span>
              <span></span>
            </div>
          </summary>
          <motion.div
            className={styles.answer}
            initial={{ height: i === 0 ? 'auto' : 0 }}
            animate={{ height: opened === i ? 'auto' : 0 }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          >
            {answer}
          </motion.div>
        </details>
      ))}
    </div>
  );
}
