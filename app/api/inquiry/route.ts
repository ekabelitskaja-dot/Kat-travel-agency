import {NextResponse} from 'next/server';

import {deliverInquiryEmail, inquiryMailUrl, inquiryWhatsAppUrl, parseInquiry, type InquiryInput} from '@/lib/inquiry';
import {SITE_URL} from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let input: InquiryInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ok: false, error: 'Invalid request.'}, {status: 400});
  }

  const parsed = parseInquiry(input);
  if ('error' in parsed) {
    return NextResponse.json({ok: false, error: parsed.error}, {status: 400});
  }

  const links = {
    whatsappUrl: inquiryWhatsAppUrl(parsed.inquiry),
    mailUrl: inquiryMailUrl(parsed.inquiry)
  };

  try {
    const pageUrl = request.headers.get('referer') || request.headers.get('origin') || `${SITE_URL}/`;
    const delivered = await deliverInquiryEmail(parsed.inquiry, pageUrl);
    if (!delivered.ok) {
      const status = delivered.code === 'activation_required' ? 409 : 502;
      return NextResponse.json({ok: false, code: delivered.code, ...links}, {status});
    }
  } catch {
    return NextResponse.json({ok: false, code: 'delivery_failed', ...links}, {status: 502});
  }

  return NextResponse.json({ok: true, ...links});
}
