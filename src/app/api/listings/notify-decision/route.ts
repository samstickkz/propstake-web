// Sends an email to a lister when their listing is approved or rejected
// (#19). Server-only — uses RESEND_API_KEY which never reaches the client.
// Gracefully no-ops if the key isn't configured so the admin flow doesn't
// break in environments without email set up.

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const FROM = 'PropStake <noreply@propstake.org>';
const SITE = 'https://www.propstake.org';

type Body = {
  to: string;
  listerName?: string | null;
  listingName: string;
  listingId: string;
  decision: 'approved' | 'rejected';
  reason?: string | null;
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Don't break the admin flow if email isn't configured yet.
    console.warn('RESEND_API_KEY not set — notify-decision is a no-op.');
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }

  if (!body?.to || !body?.listingName || !body?.listingId || !body?.decision) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const hello = body.listerName ? `Hi ${body.listerName},` : 'Hi,';
  const url = `${SITE}/properties/${body.listingId}`;

  try {
    if (body.decision === 'approved') {
      await resend.emails.send({
        from: FROM,
        to: [body.to],
        subject: `Your listing "${body.listingName}" is live`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
            <p>${hello}</p>
            <p>Good news — your listing <strong>${body.listingName}</strong> has been approved and is now live on PropStake.</p>
            <p style="margin:24px 0;">
              <a href="${url}" style="background:#059669;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;">View it live →</a>
            </p>
            <p style="color:#666;font-size:13px;">You can manage all your listings from the PropStake app under <em>My Listings</em>.</p>
          </div>`,
      });
    } else {
      const reason = body.reason?.trim();
      await resend.emails.send({
        from: FROM,
        to: [body.to],
        subject: `Your listing "${body.listingName}" needs an update`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
            <p>${hello}</p>
            <p>Your listing <strong>${body.listingName}</strong> wasn't approved this time.</p>
            ${reason ? `<p><strong>Reviewer's note:</strong> ${reason}</p>` : ''}
            <p>Edit and resubmit from the PropStake app under <em>My Listings</em>. Once edited, it goes back into the review queue automatically.</p>
            <p style="color:#666;font-size:13px;">If you think this was a mistake, reply to this email.</p>
          </div>`,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('notify-decision Resend error:', err);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}
