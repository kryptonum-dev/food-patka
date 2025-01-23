'use client';
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

type CounterTypes = {
  value: number;
};

export default function Counter({ value }: CounterTypes) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => springValue.on('change', (latest: number) => {
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat('pl-PL').format(
        Math.round(latest)
      );
    }
  }), [springValue]);

  return <span ref={ref}>{Intl.NumberFormat('pl-PL').format(value)}</span>;
}
