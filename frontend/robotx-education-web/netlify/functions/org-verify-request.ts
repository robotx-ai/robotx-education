import type { Handler } from "@netlify/functions";
import crypto from "crypto";
import { sendEmail } from "./_lib/mailer";
import { prisma } from "./_lib/prisma";
import { getSupabaseClients } from "./_lib/supabase";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function signToken(payload: object, secret: string) {
  const body = base64Url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(body).digest();
  return `${body}.${base64Url(sig)}`;
}

async function getUserId(token?: string) {
  if (!token) return null;
  const { supabaseAnon } = await getSupabaseClients();
  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const token = event.headers.authorization?.replace("Bearer ", "");
  const userId = await getUserId(token);
  if (!userId) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  const { orgEmail, orgName } = JSON.parse(event.body || "{}");
  if (!orgEmail || !orgName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing organization email or name." }),
    };
  }

  const normalizedOrgEmail = normalizeEmail(orgEmail);

  const conflict = await prisma.profile.findFirst({
    where: {
      OR: [{ orgEmail: normalizedOrgEmail }, { email: normalizedOrgEmail }],
      NOT: { userId },
    },
  });

  if (conflict) {
    return {
      statusCode: 409,
      body: JSON.stringify({ message: "Organization email already in use." }),
    };
  }

  await prisma.profile.update({
    where: { userId },
    data: {
      orgEmail: normalizedOrgEmail,
      orgName,
      eduVerified: false,
    },
  });

  const secret = process.env.ORG_VERIFY_SECRET;
  const siteUrl = process.env.SITE_URL;

  if (!secret || !siteUrl) {
    const missing = [
      !secret ? "ORG_VERIFY_SECRET" : null,
      !siteUrl ? "SITE_URL" : null,
    ].filter(Boolean);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Missing configuration: ${missing.join(", ")}`,
      }),
    };
  }

  const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  const tokenPayload = { userId, orgEmail: normalizedOrgEmail, exp: expiresAt };
  const verifyToken = signToken(tokenPayload, secret);
  const verifyUrl = `${siteUrl}/profile?org_verify=${verifyToken}`;

  try {
    await sendEmail({
      to: normalizedOrgEmail,
      subject: "Verify your organization",
      text: `Click the link to verify your organization: ${verifyUrl}`,
      html: `<p>Click the button below to verify your organization.</p><p><a href="${verifyUrl}" style="background:#111;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Verify My Organization</a></p>`,
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send verification email." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Verification email sent." }),
  };
};
