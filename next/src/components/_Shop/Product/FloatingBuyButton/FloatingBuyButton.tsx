'use client';
import { useEffect, useState } from 'react';
import styles from './FloatingBuyButton.module.scss';

export default function FloatingBuyButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const productInfoSection = document.querySelector('[data-product-info-section]');
    if (!productInfoSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]) return;
      setIsVisible(!entries[0].isIntersecting && entries[0].boundingClientRect.y < 0);
    });
    observer.observe(productInfoSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.floatingBuyButton} ${className}`} data-visible={isVisible}>
      {children}
    </div>
  );
}
