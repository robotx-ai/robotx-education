import type { Handler } from "@netlify/functions";
import { prisma } from "./_lib/prisma";
import { getSupabaseClients } from "./_lib/supabase";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

async function getUserId(token?: string) {
  if (!token) return null;
  const { supabaseAnon } = await getSupabaseClients();
  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

export const handler: Handler = async (event) => {
  const token = event.headers.authorization?.replace("Bearer ", "");
  const userId = await getUserId(token);
  if (!userId) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  if (event.httpMethod === "GET") {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    return {
      statusCode: 200,
      body: JSON.stringify(profile),
    };
  }

  if (event.httpMethod !== "PATCH") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const { fullName, orgName, orgEmail } = JSON.parse(event.body || "{}");

  if (orgEmail) {
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
  }

  const profile = await prisma.profile.update({
    where: { userId },
    data: {
      fullName,
      orgName,
      orgEmail: orgEmail ? normalizeEmail(orgEmail) : null,
      eduVerified: false,
    },
  });

  return { statusCode: 200, body: JSON.stringify(profile) };
};
