'use client';
import { DOMAIN } from '@/global/constants';
import Button from '@/components/ui/Button';
import type { ButButtonTypes } from './ButButton.types';

export default function ButButton({ children, href, content_id, content_name }: ButButtonTypes) {
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
