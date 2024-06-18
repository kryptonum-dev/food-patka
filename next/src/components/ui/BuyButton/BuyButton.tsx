'use client';
import Button from '@/components/ui/Button';
import type { BuyButtonTypes } from './BuyButton.types';

const DOMAIN = 'https://food-patka-git-dev-kryptonum.vercel.app';

export default function BuyButton({ children, href, content_id, content_name }: BuyButtonTypes) {
  const handleClick = () => {
    fetch(`${DOMAIN}/api/meta-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'AddToCart',
        content_id: content_id,
        content_name: content_name,
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
