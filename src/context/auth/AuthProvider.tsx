
import { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useAuthProvider } from "./useAuthProvider";

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
