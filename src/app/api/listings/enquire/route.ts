// #21 — accept enquiry, insert into listing_enquiries, email the lister.
// Anon submissions are allowed by RLS; we use the public client. Email send
// is best-effort and no-ops when RESEND_API_KEY isn't set.

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const FROM = "PropStake <noreply@propstake.org>";
const SITE = "https://www.propstake.org";

type Body = {
  propertyId: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
  if (
    !body?.propertyId ||
    !body?.name?.trim() ||
    !body?.email?.trim() ||
    !body?.message?.trim()
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (body.message.length > 4000 || body.name.length > 200) {
    return NextResponse.json({ error: "Too long" }, { status: 413 });
  }

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "https://dfkqfyylqfkbgqxarmxm.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_Z6UG3LsEiop9-K2sU3YZCQ_jOXnJCkX";
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Insert the enquiry row (RLS allows anon insert).
  const { error: insErr } = await supabase.from("listing_enquiries").insert({
    property_id: body.propertyId,
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || null,
    message: body.message.trim(),
  });
  if (insErr) {
    return NextResponse.json(
      { error: "Could not save enquiry" },
      { status: 500 }
    );
  }

  // Look up listing + lister email for the notification.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, emailed: false });
  }
  const { data: prop } = await supabase
    .from("properties")
    .select("name, listing_type, owner_id")
    .eq("id", body.propertyId)
    .maybeSingle();
  if (!prop) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  let listerEmail: string | null = null;
  if (prop.owner_id) {
    const { data: owner } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", prop.owner_id)
      .maybeSingle();
    listerEmail = owner?.email ?? null;
  }
  if (!listerEmail) {
    // Admin-curated listing (no owner_id) — nothing to email.
    return NextResponse.json({ ok: true, emailed: false });
  }

  const listingUrl = `${SITE}/properties/${body.propertyId}`;
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: FROM,
      to: [listerEmail],
      replyTo: body.email,
      subject: `New enquiry on "${prop.name}"`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
          <p>You've got a new enquiry on your listing <strong>${prop.name}</strong>.</p>
          <table style="margin:16px 0;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;color:#666;">From</td><td>${body.name}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
            ${body.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td>${body.phone}</td></tr>` : ""}
          </table>
          <p style="white-space:pre-wrap;background:#f6f6f6;border-radius:8px;padding:14px;font-size:14px;">${body.message.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] || c)}</p>
          <p style="margin:24px 0;">
            <a href="${listingUrl}" style="background:#059669;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;">View your listing →</a>
          </p>
          <p style="color:#666;font-size:12px;">Replying to this email reaches the enquirer directly.</p>
        </div>`,
    });
    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("enquire Resend error:", err);
    return NextResponse.json({ ok: true, emailed: false });
  }
}
