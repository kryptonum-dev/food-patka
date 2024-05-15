import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRAPI_API_KEY!);

export async function GET() {
  const promotionCode = await stripe.promotionCodes.create({
    coupon: 'ejUvFl45',
  });

  const { code } = promotionCode;

  console.log(code);

  return NextResponse.json({ code: code, success: true }, { status: 200 });
}
