
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from '@/components/SignInForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from '@/hooks/use-toast';
import { mockUserProfiles } from '@/lib/mock-data';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSuperAdminLogin = async () => {
    setIsLoading(true);
    try {
      // Set the email and password for admin
      const email = 'admin@maxom.ai';
      const password = 'Admin123!';
      
      // For demo purposes, directly sign in with hardcoded admin credentials
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Could not log in as super admin. Please check credentials.",
          variant: "destructive"
        });
        console.error("Super admin login error:", error);
        return;
      }
      
      if (data.user) {
        // Successfully logged in
        toast({
          title: "Super Admin Login Successful",
          description: "Welcome to the Super Admin dashboard."
        });
        
        // Redirect to super admin page
        navigate('/super-admin');
      }
    } catch (err) {
      const error = err as Error;
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
                <SignInForm />
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
                <div className="text-sm text-muted-foreground">
                  Use the button below to log in with super admin privileges.
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleSuperAdminLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as Super Admin"}
                </Button>
                <div className="text-xs text-muted-foreground mt-4">
                  <p>Default Super Admin credentials:</p>
                  <p>Email: admin@maxom.ai</p>
                  <p>Password: Admin123!</p>
                  <p className="mt-2 text-amber-500">This is for demo purposes only.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
