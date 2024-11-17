import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient("https://hpkbsfgllmadxdunqwkl.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwa2JzZmdsbG1hZHhkdW5xd2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTAxNDQ3NywiZXhwIjoyMDQ0NTkwNDc3fQ.pnZE-6_Crwb2RAr1QExGa4flEC3AlOka_Ev8SlJ3a9Y')
