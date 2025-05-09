
import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { useAuthState } from "./useAuthState";
import { signIn, signUp, signOut, updateProfile, fetchUserProfile } from "./authActions";
import { 
  isSuperAdminEmail, 
  getMockSuperAdminProfile, 
  createProfileFromDbData, 
  createProfileFromMetadata,
  createMockUser 
} from "./authUtils";

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user, setUser,
    profile, setProfile,
    loading, setLoading,
    session, setSession
  } = useAuthState();
  
  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      setLoading(true);

      // Check for mock super admin in localStorage first
      const mockSuperAdminStr = localStorage.getItem('mockSuperAdmin');
      if (mockSuperAdminStr) {
        try {
          const mockData = JSON.parse(mockSuperAdminStr);
          console.log("Found mock super admin in localStorage:", mockData);
          
          // Create a mock user
          const mockUser = createMockUser(mockData);
          
          setUser(mockUser);
          setProfile(mockData.profile || {
            id: 'mock-super-admin-id',
            first_name: 'Super',
            last_name: 'Admin',
            email: mockData.email,
            role: 'super_admin'
          });
          
          setLoading(false);
          return { unsubscribe: () => {} }; // Mock subscription
        } catch (err) {
          console.error("Error parsing mock super admin:", err);
          localStorage.removeItem('mockSuperAdmin'); // Clear invalid data
        }
      }

      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.email);
          setSession(newSession);
          setUser(newSession?.user ?? null);

          if (event === 'SIGNED_OUT') {
            setProfile(null);
            localStorage.removeItem('mockSuperAdmin'); // Clear any mock admin data on sign out
            // Ensure navigation to login page after sign out
            setTimeout(() => {
              navigate('/login');
            }, 0);
          } else if (event === 'SIGNED_IN' && newSession?.user) {
            // Check if it's the admin user by email - for demo purposes
            if (isSuperAdminEmail(newSession.user.email)) {
              console.log("Super admin logged in, setting mock profile");
              // Use the mock super admin profile
              const adminProfile = getMockSuperAdminProfile();
              if (adminProfile) {
                setProfile(adminProfile);
                
                // Redirect to appropriate page
                setTimeout(() => {
                  navigate('/super-admin');
                }, 0);
                
                return;
              }
            }

            // For other users, fetch from the database
            setTimeout(async () => {
              try {
                const userData = await fetchUserProfile(newSession.user.id, setProfile);
                
                if (userData) {
                  // Create user profile from database data
                  const userProfile = createProfileFromDbData(userData, newSession.user);
                  setProfile(userProfile);
                  
                  // Redirect based on role
                  redirectBasedOnRole(userProfile.role);
                } else {
                  console.log("No profile found, checking user metadata");
                  // If no profile is found in the database, try to use the user metadata
                  const metadataProfile = createProfileFromMetadata(newSession.user);
                  console.log("Created profile from metadata:", metadataProfile);
                  setProfile(metadataProfile);
                  
                  // Redirect based on role from metadata
                  redirectBasedOnRole(metadataProfile.role);
                }
              } catch (err) {
                console.error("Exception fetching profile:", err);
              }
            }, 0);
          }
        }
      );

      // Then check for existing session
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session:", currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch user profile if there's an active session
        if (currentSession?.user) {
          // Check if it's the admin user by email - for demo purposes
          if (isSuperAdminEmail(currentSession.user.email)) {
            console.log("Found existing super admin session");
            // Use the mock super admin profile
            const adminProfile = getMockSuperAdminProfile();
            if (adminProfile) {
              setProfile(adminProfile);
            }
          } else {
            // For other users, fetch from the database
            try {
              const userData = await fetchUserProfile(currentSession.user.id, setProfile);
              
              if (userData) {
                // Create user profile from database data
                const userProfile = createProfileFromDbData(userData, currentSession.user);
                setProfile(userProfile);
              } else {
                console.log("No existing profile found, checking user metadata");
                // If no profile is found in the database, try to use the user metadata
                const metadataProfile = createProfileFromMetadata(currentSession.user);
                console.log("Created profile from metadata:", metadataProfile);
                setProfile(metadataProfile);
              }
            } catch (err) {
              console.error("Exception fetching existing profile:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error getting session:", err);
      }

      setLoading(false);
      
      return subscription;
    }

    const subscription = getSession();

    return () => {
      // Clean up the subscription when the component unmounts
      subscription.then(sub => sub.unsubscribe());
    };
  }, [navigate, setLoading, setProfile, setSession, setUser]);

  // Helper function to redirect based on user role
  const redirectBasedOnRole = (role: string) => {
    if (role === 'business_owner') {
      navigate('/business-admin');
    } else if (role === 'super_admin') {
      navigate('/super-admin');
    } else {
      navigate('/dashboard');
    }
  };

  // Handle sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    return signIn(email, password, navigate);
  };

  // Handle sign up with email and password
  const handleSignUp = async (email: string, password: string, options: any = {}) => {
    return signUp(email, password, navigate, options);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut(navigate);
  };

  // Handle update profile
  const handleUpdateProfile = async (updates: any) => {
    await updateProfile(updates, profile);
    // Update local profile state
    setProfile(prev => {
      return prev ? { ...prev, ...updates } : null;
    });
  };

  const value = {
    user,
    profile,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
