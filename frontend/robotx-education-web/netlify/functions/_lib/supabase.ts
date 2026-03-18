type SupabaseClients = {
  supabaseAnon: ReturnType<typeof import("@supabase/supabase-js")["createClient"]>;
  supabaseAdmin: ReturnType<typeof import("@supabase/supabase-js")["createClient"]>;
};

let cachedClients: SupabaseClients | null = null;

export async function getSupabaseClients(): Promise<SupabaseClients> {
  if (cachedClients) return cachedClients;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  const { createClient } = await import("@supabase/supabase-js");

  cachedClients = {
    supabaseAnon: createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    }),
    supabaseAdmin: createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    }),
  };

  return cachedClients;
}
