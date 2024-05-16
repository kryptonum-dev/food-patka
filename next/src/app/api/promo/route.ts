import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';
import SendPromoCode from '@/emails/send-promo-code';
import type { RequestTypes } from './route.types';

const stripe = new Stripe(process.env.STRAPI_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    customer_email,
    customer_first_name,
  } = await request.json() as RequestTypes;

  try {
    const { code } = await stripe.promotionCodes.create({
      coupon: 'ejUvFl45',
    });

    await resend.emails.send({
      from: 'FoodPatka <sklep@foodpatka.pl>',
      reply_to: 'wspolpraca@foodpatka.pl',
      to: customer_email,
      subject: 'Twój kod rabatowy od FoodPatka!',
      react: SendPromoCode({
        name: customer_first_name,
        code: code
      }),
    });
    return NextResponse.json({
      success: true,
      message: 'Promo code successfully generated and sent.'
    }, { status: 200 });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong with generating promo code or with sending it via email.'
    }, { status: 500 });
  }
}
