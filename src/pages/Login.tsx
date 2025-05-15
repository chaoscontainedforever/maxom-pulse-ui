
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import StandardLoginForm from '@/components/auth/StandardLoginForm';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import { useLoginHandler } from '@/hooks/useLoginHandler';

const Login = () => {
  const { 
    isLoading,
    standardError, 
    adminError,
    handleStandardLogin, 
    handleSuperAdminLogin 
  } = useLoginHandler();

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
                <StandardLoginForm 
                  onSubmit={handleStandardLogin}
                  isLoading={isLoading}
                  error={standardError}
                />
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
                <AdminLoginForm 
                  onSubmit={handleSuperAdminLogin}
                  isLoading={isLoading}
                  error={adminError}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
