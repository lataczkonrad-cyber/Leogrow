/* Leogrow — connection settings for accounts and progress sync.
   Values from Supabase → Project Settings. Both are safe to be public. */
window.LINGROW_CONFIG = window.LINGROW_CONFIG || {
  supabaseUrl: "https://dqksrcffgkngjbkkfhby.supabase.co",
  supabaseAnonKey: "sb_publishable_3DqjA-lTMKMDAavURFcHog_syyO5u8U",   // publishable key (or legacy anon key)
  google: null,          // null = show the Google button when it is switched on in Supabase (true/false to force)
  apple: null,           // same for Apple
  googleClientId: "155413300411-92vvb8icak07ldnhnvc5ahsfmpl10v5r.apps.googleusercontent.com"   // Google Cloud web client (public): Google's own sign-in window
};
