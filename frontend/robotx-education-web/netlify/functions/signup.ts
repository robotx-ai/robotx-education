import type { Handler } from "@netlify/functions";
import { prisma } from "./_lib/prisma";
import { getSupabaseClients } from "./_lib/supabase";

async function findUserByEmail(email: string) {
  const { supabaseAdmin } = await getSupabaseClients();
  const perPage = 1000;
  let page = 1;

  while (page <= 5) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const match = data.users.find((user) => user.email?.toLowerCase() === email);
    if (match) {
      return match;
    }

    if (data.users.length < perPage) {
      break;
    }

    page += 1;
  }

  return null;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const { fullName, email, password } = JSON.parse(event.body || "{}");
  if (!fullName || !email || !password) {
    return { statusCode: 400, body: JSON.stringify({ message: "Missing required fields." }) };
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const siteUrl = process.env.SITE_URL;
  const { supabaseAdmin, supabaseAnon } = await getSupabaseClients();

  // Rule: an org email (profiles.org_email) can never be used as a signup email.
  // This prevents a new user from taking another user's verified organization email.
  const profileUsingOrgEmail = await prisma.profile.findFirst({
    where: { orgEmail: normalizedEmail },
  });
  if (profileUsingOrgEmail) {
    return {
      statusCode: 409,
      body: JSON.stringify({ message: "Organization email already in use." }),
    };
  }

  // Signup email uniqueness check (profiles.email).
  // If this exists, we only allow a retry if the corresponding auth user is still unconfirmed.
  const profileUsingEmail = await prisma.profile.findUnique({
    where: { email: normalizedEmail },
  });
  if (profileUsingEmail) {
    const { data: authUserData, error: authUserError } = await supabaseAdmin.auth.admin.getUserById(
      profileUsingEmail.userId,
    );
    const authUser = authUserData?.user;

    // If we cannot fetch the auth user, do not risk deleting a profile row.
    if (authUserError || !authUser) {
      return { statusCode: 409, body: JSON.stringify({ message: "Email already in use." }) };
    }

    if (authUser.email_confirmed_at) {
      return { statusCode: 409, body: JSON.stringify({ message: "Email already in use." }) };
    }

    // Stale unconfirmed signup retry: delete the old auth user + its profile row (by userId).
    await supabaseAdmin.auth.admin.deleteUser(authUser.id);
    await prisma.profile.deleteMany({ where: { userId: authUser.id } });
  }

  // Also handle the case where an unconfirmed auth user exists but profile row does not (or was removed).
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser?.email_confirmed_at) {
    return { statusCode: 409, body: JSON.stringify({ message: "Email already in use." }) };
  }
  if (existingUser?.id && !existingUser.email_confirmed_at) {
    await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
    await prisma.profile.deleteMany({ where: { userId: existingUser.id } });
  }

  const { data, error } = await supabaseAnon.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "CUSTOMER",
      },
      emailRedirectTo: siteUrl ? `${siteUrl}/login` : undefined,
    },
  });

  if (error || !data.user) {
    console.error("[signup] signUp failed", {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      email: normalizedEmail,
    });
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error?.message || "Signup failed.",
        code: error?.code,
        status: error?.status,
      }),
    };
  }

  await prisma.profile.upsert({
    where: { userId: data.user.id },
    update: {
      email: normalizedEmail,
      fullName,
      role: "CUSTOMER",
    },
    create: {
      userId: data.user.id,
      email: normalizedEmail,
      fullName,
      role: "CUSTOMER",
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Verification email sent. Please check your inbox.",
      userId: data.user.id,
      emailConfirmedAt: data.user.email_confirmed_at,
      sessionExists: Boolean(data.session),
    }),
  };
};
