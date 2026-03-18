import type { Handler } from "@netlify/functions";
import { sendTestEmail } from "./_lib/mailer";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const { to } = JSON.parse(event.body || "{}");
  if (!to) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing recipient email." }) };
  }

  try {
    const result = await sendTestEmail(to);
    return {
      statusCode: 200,
      body: JSON.stringify({
        messageId: result.messageId,
        accepted: result.accepted,
        rejected: result.rejected,
      }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send test email.";
    return { statusCode: 500, body: JSON.stringify({ message }) };
  }
};
