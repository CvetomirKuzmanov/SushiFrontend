import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfwfqdvlxgmqfxnfcuoy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2ZxZHZseGdtcWZ4bmZjdW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTA5MDEsImV4cCI6MjA2NzQ4NjkwMX0.6HaL6pLFvOs77ZLYIki8ffhTTok1fns1fHO4o_Kcdpk';

export const supabase = createClient(supabaseUrl, supabaseKey);