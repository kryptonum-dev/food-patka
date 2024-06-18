import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hash } from '@/utils/hash';

const API_VERSION = 'v20.0';
const PIXEL_ID = '961763381554677';
const PAYLOAD_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${process.env.META_CONVERSION_API}`;
const current_timestamp = Math.floor(Date.now() / 1000);

export async function POST(request: Request) {
  const client_ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  const client_user_agent = request.headers.get('user-agent');

  const fbc = cookies().get('_fbc');
  const fbp = cookies().get('_fbp');

  const {
    event_name,
    email,
    content_id,
    content_name,
    content_price,
  } = await request.json();

  console.log('fbc', fbc);
  console.log('fbp', fbp);

  try {
    await fetch(PAYLOAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'data': [
          {
            'event_name': event_name,
            'event_time': current_timestamp,
            'action_source': 'website',
            'user_data': {
              'client_ip_address': client_ip_address,
              'client_user_agent': client_user_agent,
              ...email && { 'em': await hash(email) },
              ...fbc && { 'fbc': fbc },
              ...fbp && { 'fbc': fbp },
            },
            'custom_data': {
              'content_ids': content_id,
              'content_name': content_name,
              'content_type': 'product',
              ...content_price && {
                'value': content_price,
                'currency': 'PLN',
              },
            },
          },
        ],
      }),
    });
    return NextResponse.json({
      success: true,
    }, { status: 200 });
  } catch {
    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
}
