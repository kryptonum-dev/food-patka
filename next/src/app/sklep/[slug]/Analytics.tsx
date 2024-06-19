'use client';
import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

export default function Analytics({
  item_id,
  item_name,
}: {
  item_id: string;
  item_name: string;
}) {
  useEffect(() => {
    if (!item_name || !item_id) return;
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'PageView',
        content_id: item_id,
        content_name: item_name,
      }),
    });
    setTimeout(() => {
      sendGTMEvent({
        event: 'view_item',
        items: [
          {
            item_id: item_id,
            item_name: item_name,
            quantity: 1,
          },
        ],
      });
    }, 1000);
  }, [item_id, item_name]);

  return null;
}