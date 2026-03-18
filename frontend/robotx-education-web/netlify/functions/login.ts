import type { Handler } from "@netlify/functions";
import { getSupabaseClients } from "./_lib/supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const { email, password } = JSON.parse(event.body || "{}");
  if (!email || !password) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing email or password." }) };
  }

  const { supabaseAnon } = await getSupabaseClients();
  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: error?.message || "Login failed." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    }),
  };
};
