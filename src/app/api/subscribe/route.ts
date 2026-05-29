// File: app/api/subscribe/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // 1. Log when the function is first called
  console.log("✅ API route /api/subscribe was hit!");

  // Lazy-init so importing this module at build time doesn't crash when
  // RESEND_API_KEY is unset (Resend's constructor throws on a missing key).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — subscribe endpoint disabled.");
    return NextResponse.json(
      { error: 'Email service not configured.' },
      { status: 503 },
    );
  }
  const resend = new Resend(apiKey);

  try {
    const { email } = await req.json();
    
    // 2. Log the email that was received
    console.log("📧 Received email from form:", email);

    if (!email) {
      console.log("🔥 Error: Email is missing from the request.");
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // 3. Log right before making the call to Resend
    console.log("Attempting to send email with Resend...");
    console.log(`  -> From: 'ProStake <noreply@your-verified-domain.com>'`);
    console.log(`  -> To: ${email}`);

    const { data, error } = await resend.emails.send({
      from: 'ProStake <noreply@your-verified-domain.com>',
      to: [email],
      subject: 'Welcome to the ProStake Community! ✨',
      html: `
        <div>
          <h1>Thanks for subscribing!</h1>
          <p>You're now on the list to receive exclusive insights.</p>
        </div>
      `,
    });

    if (error) {
      // 4. This will log any specific error returned from Resend
      console.error("🔥 Resend Error:", error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    // 5. Log a success message if the email is sent
    console.log("✅ Resend call successful:", data);
    return NextResponse.json({ message: 'Success!' }, { status: 200 });

  } catch (error) {
    // 6. This will catch any other errors in the function
    console.error("🔥 API Route General Error:", error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}