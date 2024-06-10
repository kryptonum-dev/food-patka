'use client';
import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

export default function Analytics({
  item_name,
  item_id,
}: {
  item_name: string;
  item_id: string;
}) {
  useEffect(() => {
    if (!item_name || !item_id) return;

    sendGTMEvent({
      event: 'view_item',
      items: [
        {
          item_name: item_name,
          item_id: item_id,
          quantity: 1,
        },
      ],
    });
  });

  return null;
}