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
  });

  return null;
}