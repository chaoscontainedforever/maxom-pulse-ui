
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from '@/hooks/use-toast';
import { mockUserProfiles } from '@/lib/mock-data';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    // Check if user is already authenticated
    if (user) {
      console.log("User already authenticated, redirecting...", user);
      
      // Determine where to redirect based on user role
      if (user.user_metadata?.role === 'super_admin') {
        navigate('/super-admin');
      } else if (user.user_metadata?.role === 'business_owner') {
        navigate('/business-admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  // For super admin login form
  const [adminEmail, setAdminEmail] = useState('admin@maxom.ai');
  const [adminPassword, setAdminPassword] = useState('Admin123!');
  const [adminError, setAdminError] = useState<string | null>(null);

  // Standard login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [standardError, setStandardError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStandardError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setStandardError(error.message);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!"
        });
        
        // Auth context will handle redirection based on user role
      }
    } catch (err) {
      const error = err as Error;
      setStandardError(error.message);
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAdminError(null);
    
    try {
      console.log("Attempting super admin login with:", adminEmail);
      
      // Special case for the demo super admin
      if (adminEmail === 'admin@maxom.ai' && adminPassword === 'Admin123!') {
        console.log("Using mock login for super admin");
        
        // Find the admin profile from mock data
        const adminProfile = mockUserProfiles.find(profile => profile.role === 'super_admin');
        
        if (adminProfile) {
          // Store admin info in localStorage for the auth provider to use
          localStorage.setItem('mockSuperAdmin', JSON.stringify({
            email: adminEmail,
            role: 'super_admin',
            profile: adminProfile
          }));
          
          toast({
            title: "Super Admin Login Successful",
            description: "Welcome to the Super Admin dashboard."
          });
          
          // Instead of reloading, directly navigate and force the auth provider to update
          window.location.href = '/super-admin';
          return;
        }
      }
      
      // Regular Supabase auth for non-mock users
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: adminEmail,
        password: adminPassword
      });
      
      if (error) {
        setAdminError(error.message);
        toast({
          title: "Login Failed",
          description: error.message || "Could not log in as super admin. Please check credentials.",
          variant: "destructive"
        });
        console.error("Super admin login error:", error);
        return;
      }
      
      if (data.user) {
        console.log("Super admin login successful:", data.user);
        toast({
          title: "Super Admin Login Successful",
          description: "Welcome to the Super Admin dashboard."
        });
        
        navigate('/super-admin');
      }
    } catch (err) {
      const error = err as Error;
      setAdminError(error.message);
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
      console.error("Super admin login exception:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>
        
        <Tabs defaultValue="standard" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Login</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStandardLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  
                  {standardError && (
                    <p className="text-sm font-medium text-destructive">
                      {standardError}
                    </p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 items-start">
                <div className="text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/register" className="text-primary hover:underline">Register</Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Admin Login</CardTitle>
                <CardDescription>Log in as a system administrator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSuperAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input 
                      id="admin-email" 
                      type="email" 
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      placeholder="admin@maxom.ai"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input 
                      id="admin-password" 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  
                  {adminError && (
                    <p className="text-sm text-destructive">{adminError}</p>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login as Super Admin"
                    )}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground mt-4">
                    <p>Default Super Admin credentials:</p>
                    <p>Email: admin@maxom.ai</p>
                    <p>Password: Admin123!</p>
                    <p className="mt-2 text-amber-500">This is for demo purposes only.</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
