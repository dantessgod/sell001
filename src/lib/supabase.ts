import { createClient } from '@supabase/supabase-js';

// Вставьте сюда данные своего проекта Supabase.
// Anon key — публичный ключ, его можно использовать на клиенте.
export const SUPABASE_URL = 'https://adcyvxzxpfxubkocfgbi.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_DGbwXkwZkW_r0X73_5dNtA_AmmdXfID';
export const SUPABASE_TABLE = 'site_content';
export const SUPABASE_ROW_ID = 'countercup';

export const isSupabaseConfigured =
  Boolean(SUPABASE_URL.trim()) && Boolean(SUPABASE_ANON_KEY.trim());

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
