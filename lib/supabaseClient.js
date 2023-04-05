import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

export const supabase = createClient(process.env.NEXT_PUBLIC_DATABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)