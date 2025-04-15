'use client';
import { useEffect } from 'react';

// eslint-disable-next-line prefer-rest-params
const gtag: Gtag.Gtag = function () { window.dataLayer?.push(arguments); };

export default function Analytics({
  item_id,
  item_name,
}: {
  item_id: string | undefined;
  item_name: string;
}) {
  useEffect(() => {
    fetch('/api/server-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meta_event_name: 'ViewContent',
        tiktok_event_name: 'ViewContent',
        pinterest_event_name: 'page_visit',
        content_id: item_id,
        content_name: item_name,
      }),
    });

    const handleScroll = () => {
      fetch('/api/server-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta_event_name: 'PageScroll',
          content_id: item_id,
          content_name: item_name,
        }),
      });
      window.removeEventListener('scroll', handleScroll);
    };

    const timeoutId = setTimeout(() => {
      gtag('event', 'view_item', {
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
