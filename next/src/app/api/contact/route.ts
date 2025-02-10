import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { REGEX } from '@/global/constants';
import { removeHtmlTags } from '@/utils/remove-html-tags';
import type { RequestTypes } from './route.types';

const resend = new Resend(process.env.RESEND_API_TOKEN);

export async function POST(request: Request) {
  const req = await request.json() as RequestTypes;
  const { name, email, message } = req;

  const isValid = name && (email && REGEX.email.test(email)) && message;

  if (!isValid) return NextResponse.json({ success: false }, { status: 422 });

  const body = [
    `<p>Imię: <b>${name}</b></p>`,
    `<p>Adres e-mail: <b>${email}</b></p>`,
    `<p>${message.trim()}</p>`,
  ].join('');

  try {
    await resend.emails.send({
      from: `${name} przez Formularz <formularz@foodpatka.pl>`,
      to: 'patrycja@foodpatka.pl',
      replyTo: `${name} <${email}>`,
      subject: `${name} przesyła wiadomość przez formularz kontaktowy`,
      html: body,
      text: removeHtmlTags(body),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
