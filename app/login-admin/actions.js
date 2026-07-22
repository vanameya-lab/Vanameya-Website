"use server";

import { createClient } from "@/lib/supabase/server";

export async function signInAdmin(email, password) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Don't leak exact error details in production-grade app
    return { success: false, error: "Invalid credentials" };
  }

  return { success: true };
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
