import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const getSupabaseEnv = () => {
  if (!supabaseUrl) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL"
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
    );
  }

  return { supabaseUrl, supabaseKey };
};

export const createClient = () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv();

  return createBrowserClient(supabaseUrl, supabaseKey);
};
