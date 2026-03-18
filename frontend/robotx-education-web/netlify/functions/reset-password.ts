import type { Handler } from "@netlify/functions";
import { getSupabaseClients } from "./_lib/supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const token = event.headers.authorization?.replace("Bearer ", "");
  const { password } = JSON.parse(event.body || "{}");

  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  if (!password) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing password." }) };
  }

  const { supabaseAdmin, supabaseAnon } = await getSupabaseClients();
  const { data: userData, error: userError } = await supabaseAnon.auth.getUser(token);

  if (userError || !userData.user) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userData.user.id, {
    password,
  });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Password updated." }),
  };
};
