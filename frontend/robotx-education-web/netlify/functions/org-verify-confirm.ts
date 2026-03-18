import type { Handler, HandlerEvent } from "@netlify/functions";
import crypto from "crypto";
import { prisma } from "./_lib/prisma";

function base64UrlToBuffer(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64");
}

function verifyToken(token: string, secret: string) {
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expectedSig = crypto.createHmac("sha256", secret).update(payloadPart).digest();
  const actualSig = base64UrlToBuffer(signaturePart);
  if (expectedSig.length !== actualSig.length || !crypto.timingSafeEqual(expectedSig, actualSig)) {
    return null;
  }

  const payload = JSON.parse(base64UrlToBuffer(payloadPart).toString("utf8")) as {
    userId: string;
    orgEmail: string;
    exp: number;
  };

  if (Date.now() > payload.exp) return null;
  return payload;
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { token } = JSON.parse(event.body || "{}");
  const secret = process.env.ORG_VERIFY_SECRET;
  if (!token || !secret) {
    return { statusCode: 400, body: "Missing token or secret." };
  }

  const payload = verifyToken(token, secret);
  if (!payload) {
    return { statusCode: 400, body: "Invalid or expired token." };
  }

  const profile = await prisma.profile.update({
    where: { userId: payload.userId },
    data: { eduVerified: true, orgEmail: payload.orgEmail },
  });

  return { statusCode: 200, body: JSON.stringify(profile) };
};
