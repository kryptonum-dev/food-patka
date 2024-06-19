'use client';
import { useEffect } from 'react';
import type { AnalyticsTypes } from './page.types';

export default function Analytics({ ec_product, ec_product_id }: AnalyticsTypes) {
  useEffect(() => {
    if (!ec_product || !ec_product_id) return;
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Purchase',
        content_id: ec_product_id,
        content_name: ec_product,
      }),
    });
  });

  return null;
}
