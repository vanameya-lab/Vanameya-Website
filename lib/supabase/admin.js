import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase Admin client.
 * This client uses the Service Role Key, which BYPASSES Row Level Security (RLS).
 * 
 * WARNING: NEVER use this client in the browser or expose it to the client side.
 * Only use this in secure server environments (e.g., Next.js Server Actions, Route Handlers)
 * for administrative tasks like securely creating an order or a customer during checkout.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
