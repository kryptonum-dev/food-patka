import { NextResponse } from 'next/server';
import { REGEX } from '@/global/constants';
import type { RequestTypes } from './route.types';

const NEWSLETTER_LIST_ID = 'Xpp3AD';
const HEADERS = {
  accept: 'application/json',
  revision: '2024-05-15',
  'Content-Type': 'application/json',
  Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY!}`
};

export async function POST(request: Request) {
  try {
    const { name, email, legal } = await request.json() as RequestTypes;

    const isValid = name && (email && REGEX.email.test(email)) && legal;

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: 'Request data is invalid'
      }, { status: 422 });
    }

    const createUserApi = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [{
                type: 'profile',
                attributes: {
                  email: email,
                  subscriptions: {
                    email: {
                      marketing: { consent: 'SUBSCRIBED' }
                    },
                  },
                },
              }]
            },
          },
          relationships: { list: { data: { type: 'list', id: NEWSLETTER_LIST_ID } } }
        },
      })
    });

    if (createUserApi.status === 202) {
      const updateNameApi = await fetch('https://a.klaviyo.com/api/profile-import/', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          data: {
            type: 'profile',
            attributes: {
              email: email,
              first_name: name,
            },
          }
        })
      });
      if (updateNameApi.status === 200 || updateNameApi.status === 201) {
        return NextResponse.json({
          success: true,
          message: 'Successfully created new subscriber'
        });
      }
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to create a new subscriber'
    }, { status: 422 });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 422 });
  }
}
