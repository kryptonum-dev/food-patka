'use client';
import Button from '@/components/ui/Button';
import type { BuyButtonTypes } from './BuyButton.types';

export default function BuyButton({ children, href, content_id, content_name }: BuyButtonTypes) {
  const handleClick = () => {
    fetch('/api/server-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meta_event_name: 'AddToCart',
        tiktok_event_name: 'AddToCart',
        pinterest_event_name: 'add_to_cart',
        content_id: content_id,
        content_name: content_name,
        event_source_url: href,
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
