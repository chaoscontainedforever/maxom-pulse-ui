
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "./types";

/**
 * Custom hook to manage authentication state
 */
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  return {
    user,
    setUser,
    profile,
    setProfile,
    loading,
    setLoading,
    session,
    setSession
  };
}
