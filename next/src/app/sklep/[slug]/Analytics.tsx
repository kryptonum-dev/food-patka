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

    const handleScroll = () => {
      fetch('/api/meta-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'PageScroll',
          content_id: item_id,
          content_name: item_name,
        }),
      });
      window.removeEventListener('scroll', handleScroll);
    };

    const timeoutId = setTimeout(() => {
      sendGTMEvent({
        event: 'view_item',
        send_to: 'G-VMCRFRPEPX',
        items: [
          {
            item_id: item_id,
            item_name: item_name,
            quantity: 1,
          },
        ],
      });
      window.addEventListener('scroll', handleScroll);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [item_id, item_name]);

  return null;
}