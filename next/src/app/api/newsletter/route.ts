import { NextResponse } from 'next/server';
import { REGEX } from '@/global/constants';
import type { BodyTypes, RequestTypes } from './route.types';

const NEWSLETTER_LIST_ID = 'Xpp3AD';
const HEADERS = {
  accept: 'application/json',
  revision: '2024-05-15',
  'Content-type': 'application/json',
  Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY!}`
};

async function createProfile(body: BodyTypes) {
  const response = await fetch('https://a.klaviyo.com/api/profile-import/', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return response.json();
}

async function addProfileToList(profileId: string) {
  const response = await fetch(`https://a.klaviyo.com/api/lists/${NEWSLETTER_LIST_ID}/relationships/profiles/`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      data: [{ type: 'profile', id: profileId }]
    }),
  });
  return response.status === 204 ? {} : response.json();
}

export async function POST(request: Request) {
  try {
    const { name, email, legal } = await request.json() as RequestTypes;

    if (!name || !email || !REGEX.email.test(email) || !legal) {
      return NextResponse.json({ success: false }, { status: 422 });
    }

    const body: BodyTypes = {
      data: {
        type: 'profile',
        attributes: {
          email,
          first_name: name,
        },
      }
    };

    const profileResponse = await createProfile(body);

    if (!profileResponse.data?.id) {
      return NextResponse.json({
        success: false,
        message: 'Unable to create new subscriber'
      }, { status: 422 });
    }

    try {
      await addProfileToList(profileResponse.data.id);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Failed to add profile to list'
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully created new subscriber and added to list'
    });

  } catch {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 422 });
  }
}
