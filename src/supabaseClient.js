import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://supabase.com/dashboard/project/punmouxtvxsowzmrmowa';
const SUPABASE_ANON_KEY = 'sb_secret_nEE8JTCOsj3ppVIa6Buftw_X5-raAz3'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);