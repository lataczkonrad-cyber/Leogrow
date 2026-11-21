/* Leogrow — connection settings for accounts and progress sync.
   Values from Supabase → Project Settings. Both are safe to be public. */
window.LINGROW_CONFIG = window.LINGROW_CONFIG || {
  supabaseUrl: "https://dqksrcffgkngjbkkfhby.supabase.co",
  supabaseAnonKey: "sb_publishable_3DqjA-lTMKMDAavURFcHog_syyO5u8U",   // publishable key (or legacy anon key)
  google: null,          // null = show the Google button when it is switched on in Supabase (true/false to force)
  apple: null            // same for Apple
};
