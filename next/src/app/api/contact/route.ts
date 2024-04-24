import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { REGEX } from '@/global/constants';
import { removeHtmlTags } from '@/utils/remove-html-tags';
import type { RequestTypes } from './route.types';

const resend = new Resend(process.env.RESEND_API_TOKEN);

const emailData = {
  from: 'FoodPatka <patrycja@foodpatka.pl>',
  to: 'bogumil@kryptonum.eu',
};

export async function POST(request: Request) {
  const req = await request.json() as RequestTypes;
  const { name, email, message, legal } = req;

  const isValid = name && (email && REGEX.email.test(email)) && message && legal;

  if (!isValid) return NextResponse.json({ success: false }, { status: 422 });

  const body = [
    `<p>Imię: <b>${name}</b></p>`,
    `<p>Adres e-mail: <b>${email}</b></p>`,
    `<p>${message.trim()}</p>`,
    '<br />',
    '<br />',
    '<p><em>Wyrażono zgodnę na politykę prywatności</em></p>'
  ].join('');

  try {
    await resend.emails.send({
      from: emailData.from,
      to: emailData.to,
      reply_to: `${name} <${email}>`,
      subject: `${name} przesyła wiadomość przez formularz kontaktowy`,
      html: body,
      text: removeHtmlTags(body),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
