// Cliente de Supabase con la service role key.
// El BFF es el ÚNICO que conoce estas credenciales — los frontends nunca
// hablan con Supabase directamente.
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (client) return client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null // modo demo sin DB
  client = createClient(url, key, { auth: { persistSession: false } })
  return client
}
