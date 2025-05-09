
import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";
import { UserProfile, SignUpOptions } from "./types";
import { mockUserProfiles } from "@/lib/mock-data";

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
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
          
          // Create a mock user with all required User properties
          const mockUser = {
            id: 'mock-super-admin-id',
            email: mockData.email,
            app_metadata: {},
            user_metadata: {
              role: 'super_admin'
            },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            factors: null,
            identities: null,
            last_sign_in_at: new Date().toISOString(),
            phone: '',
            role: '',
            confirmed_at: new Date().toISOString(),
            email_confirmed_at: new Date().toISOString(),
            banned_until: null,
            reauthentication_token: null,
            recovery_token: null
          } as User;
          
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
          } else if (event === 'SIGNED_IN' && newSession?.user) {
            // Check if it's the admin user by email - for demo purposes
            if (newSession.user.email === 'admin@maxom.ai') {
              console.log("Super admin logged in, setting mock profile");
              // Use the mock super admin profile
              const adminProfile = mockUserProfiles.find(profile => profile.role === 'super_admin');
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
                const { data, error } = await supabase
                  .from("users")
                  .select("*")
                  .eq("id", newSession.user.id)
                  .single();

                if (error) {
                  console.error("Error fetching profile:", error);
                } else if (data) {
                  console.log("Fetched user profile:", data);
                  
                  // Create a UserProfile object with role from user_metadata
                  const userRole = newSession.user.user_metadata?.role || 'business_owner';
                  const userProfile: UserProfile = {
                    id: data.id,
                    first_name: data.name?.split(' ')[0] || '',
                    last_name: data.name?.split(' ').slice(1).join(' ') || '',
                    email: data.email || '',
                    role: userRole,
                    avatar_url: data.avatar_url || ''
                  };
                  
                  setProfile(userProfile);
                  
                  // Redirect based on role
                  if (userRole === 'business_owner') {
                    navigate('/business-admin');
                  } else if (userRole === 'super_admin') {
                    navigate('/super-admin');
                  } else {
                    navigate('/dashboard');
                  }
                } else {
                  console.log("No profile found, checking user metadata");
                  // If no profile is found in the database, try to use the user metadata
                  const userMetadata = newSession.user.user_metadata;
                  if (userMetadata) {
                    const metadataProfile: UserProfile = {
                      id: newSession.user.id,
                      first_name: userMetadata.first_name || '',
                      last_name: userMetadata.last_name || '',
                      email: newSession.user.email || '',
                      role: userMetadata.role || 'business_owner',
                      business_type: userMetadata.business_type || '',
                    };
                    console.log("Created profile from metadata:", metadataProfile);
                    setProfile(metadataProfile);
                    
                    // Redirect based on role from metadata
                    if (metadataProfile.role === 'business_owner') {
                      navigate('/business-admin');
                    } else if (metadataProfile.role === 'super_admin') {
                      navigate('/super-admin');
                    } else {
                      navigate('/dashboard');
                    }
                  }
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
          if (currentSession.user.email === 'admin@maxom.ai') {
            console.log("Found existing super admin session");
            // Use the mock super admin profile
            const adminProfile = mockUserProfiles.find(profile => profile.role === 'super_admin');
            if (adminProfile) {
              setProfile(adminProfile);
            }
          } else {
            // For other users, fetch from the database
            try {
              const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", currentSession.user.id)
                .single();

              if (error) {
                console.error("Error fetching profile:", error);
              } else if (data) {
                console.log("Fetched existing user profile:", data);
                
                // Create a UserProfile object with role from user_metadata
                const userRole = currentSession.user.user_metadata?.role || 'business_owner';
                const userProfile: UserProfile = {
                  id: data.id,
                  first_name: data.name?.split(' ')[0] || '',
                  last_name: data.name?.split(' ').slice(1).join(' ') || '',
                  email: data.email || '',
                  role: userRole,
                  avatar_url: data.avatar_url || ''
                };
                
                setProfile(userProfile);
              } else {
                console.log("No existing profile found, checking user metadata");
                // If no profile is found in the database, try to use the user metadata
                const userMetadata = currentSession.user.user_metadata;
                if (userMetadata) {
                  const metadataProfile: UserProfile = {
                    id: currentSession.user.id,
                    first_name: userMetadata.first_name || '',
                    last_name: userMetadata.last_name || '',
                    email: currentSession.user.email || '',
                    role: userMetadata.role || 'business_owner',
                    business_type: userMetadata.business_type || '',
                  };
                  console.log("Created profile from metadata:", metadataProfile);
                  setProfile(metadataProfile);
                }
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
  }, [navigate]);

  // Sign in with email and password
  async function signIn(email: string, password: string) {
    try {
      console.log("Signing in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error.message);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
      
      // If this is a business owner, redirect to business admin
      if (data.user?.user_metadata?.role === 'business_owner') {
        setTimeout(() => {
          navigate('/business-admin');
        }, 100);
      } else if (data.user?.user_metadata?.role === 'super_admin') {
        setTimeout(() => {
          navigate('/super-admin');
        }, 100);
      } else {
        // For regular users
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      }
      
      return { error: null };
    } catch (err) {
      const error = err as Error;
      console.error("Sign in exception:", error.message);
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  }

  // Sign up with email and password
  async function signUp(
    email: string, 
    password: string, 
    options: SignUpOptions = {}
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: options.first_name || "",
            last_name: options.last_name || "",
            role: options.role || "business_owner",
            business_type: options.business_type || "",
          },
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // If successful sign up
      if (data.user) {
        toast({
          title: "Registration Successful",
          description: "Please check your email to confirm your registration.",
        });
        navigate("/onboarding");
      }

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("/login");
  }

  // Update user profile
  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Profile Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Update local profile state
      setProfile(prev => {
        return prev ? { ...prev, ...updates } : null;
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
