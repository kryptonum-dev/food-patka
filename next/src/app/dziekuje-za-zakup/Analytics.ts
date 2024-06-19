'use client';
import { useEffect } from 'react';
import type { AnalyticsTypes } from './page.types';

export default function Analytics({ ec_product, ec_product_id, ec_amount }: AnalyticsTypes) {
  useEffect(() => {
    if (!ec_product || !ec_product_id || !ec_amount) return;
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Purchase',
        content_id: ec_product_id,
        content_name: ec_product,
        content_price: ec_amount,
      }),
    });
  }, [ec_product, ec_product_id, ec_amount]);

  return null;
}
