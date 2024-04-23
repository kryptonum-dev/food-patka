'use client';
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import type { CounterTypes } from './SimpleStats.types';

export default function Counter({ value }: CounterTypes) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => springValue.on('change', (latest: { toFixed: (arg0: number) => number | bigint; }) => {
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat('pl-PL').format(
        latest.toFixed(0)
      );
    }
  }), [springValue]);

  return <span ref={ref}>{Intl.NumberFormat('pl-PL').format(value)}</span>;
}