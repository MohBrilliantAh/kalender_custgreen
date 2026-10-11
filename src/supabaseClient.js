import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ljthcmoajvcnvkymjypg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdGhjbW9hanZjbnZreW1qeXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NjcwOTYsImV4cCI6MjEwNzI0MzA5Nn0.qqpT0akx12sAHWC_ZMJfLNXGdPg84Cjb7DS2QyU78iE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)