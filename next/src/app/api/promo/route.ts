import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';
import SendPromoCode from '@/emails/send-promo-code';

const stripe = new Stripe(process.env.STRAPI_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

const receipment = ['bogumil@kryptonum.eu'];

export async function POST() {
  try {
    const { code } = await stripe.promotionCodes.create({
      coupon: 'ejUvFl45',
    });

    await resend.emails.send({
      from: 'FoodPatka <sklep@foodpatka.pl>',
      reply_to: 'wspolpraca@foodpatka.pl',
      to: receipment,
      subject: 'Twój kod rabatowy od FoodPatka!',
      react: SendPromoCode({ code: code }),
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
