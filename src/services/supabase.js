import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irlokfwvnqhwwejxmimm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybG9rZnd2bnFod3dlanhtaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTQyMzUsImV4cCI6MjA5NjU5MDIzNX0.48ovFyOGk1kdOURNVIA4OY2urupWxgIDq50-cmAvKuM'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)