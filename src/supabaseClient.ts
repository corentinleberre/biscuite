import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lerqcssycynoxfkrbiqe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcnFjc3N5Y3lub3hma3JiaXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgxNzE0MTcsImV4cCI6MTk3Mzc0NzQxN30.ntFPCcRaSXx1z6X-ag2U3TsxjQFr_47ztpw5EQINSsY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
