import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://qhrncikameqjbjgmzfct.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFocm5jaWthbWVxamJqZ216ZmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NTI1OTksImV4cCI6MjA5NDEyODU5OX0.H_MJy4ehl384G_jOsZtH3l-Tw6r6AW9h942zhRnvtDw"

export const supabase = createClient(supabaseUrl, supabaseKey)