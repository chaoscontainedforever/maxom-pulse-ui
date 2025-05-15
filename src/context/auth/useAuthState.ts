
import React, { useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "./types";

/**
 * Custom hook to manage authentication state
 */
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  return {
    user,
    setUser,
    profile,
    setProfile,
    isLoading,
    setIsLoading,
    session,
    setSession,
    loading: isLoading // For compatibility with older components
  };
}
