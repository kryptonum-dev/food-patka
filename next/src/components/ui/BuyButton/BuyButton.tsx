'use client';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import type { BuyButtonTypes } from './BuyButton.types';

export default function BuyButton({ children, href, content_id, content_name }: BuyButtonTypes) {
  const searchParams = useSearchParams();
  const fbc = searchParams.get('fbc');

  const handleClick = () => {
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'AddToCart',
        content_id: content_id,
        content_name: content_name,
        fbc: fbc,
      }),
    });
  };

  return (
    <Button
      href={href}
      onClick={handleClick}
    >{children}</Button>
  );
}
