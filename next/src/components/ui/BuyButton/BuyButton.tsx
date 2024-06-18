'use client';
import type { BuyButtonTypes } from './BuyButton.types';
import { getCookie } from '@/utils/get-cookie';
import Button from '@/components/ui/Button';

export default function BuyButton({ children, href, content_id, content_name }: BuyButtonTypes) {
  const fbc = getCookie('_fbc');
  const fbp = getCookie('_fbp');

  const handleClick = () => {
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'AddToCart',
        content_id: content_id,
        content_name: content_name,
        fbc: fbc,
        fbp: fbp,
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
