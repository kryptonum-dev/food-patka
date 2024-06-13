'use client';
import { useEffect } from 'react';

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) {
  window.dataLayer?.push(args);
}

export default function Analytics({
  item_id,
  item_name,
}: {
  item_id: string;
  item_name: string;
}) {
  useEffect(() => {
    if (!item_name || !item_id) return;
    gtag('event', 'view_item', {
      items: [
        {
          item_id: item_id,
          item_name: item_name,
          quantity: 1,
        },
      ]
    });
  });

  return null;
}
