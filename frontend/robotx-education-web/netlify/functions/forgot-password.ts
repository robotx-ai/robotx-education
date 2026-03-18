import type { Handler } from "@netlify/functions";
import { sendEmail } from "./_lib/mailer";
import { getSupabaseClients } from "./_lib/supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const { email, redirectTo } = JSON.parse(event.body || "{}");
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing email." }) };
  }

  const { supabaseAdmin } = await getSupabaseClients();
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: redirectTo ? { redirectTo } : undefined,
  });

  const actionLink = data?.properties?.action_link;
  if (error || !actionLink) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error?.message || "Failed to generate reset link." }),
    };
  }

  try {
    await sendEmail({
      to: email,
      subject: "Reset your password",
      text: `Click the link to reset your password: ${actionLink}`,
      html: `<p>Click the button below to reset your password.</p><p><a href="${actionLink}" style="background:#111;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Reset Password</a></p>`,
    });
  } catch (sendError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send reset email." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Password reset email sent.",
    }),
  };
};
