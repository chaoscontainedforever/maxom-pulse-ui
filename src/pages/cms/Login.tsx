
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth';

export default function CMSLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in and has admin access
  useEffect(() => {
    async function checkAdminAccess() {
      if (user) {
        // Check if user has admin role
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
          
        if (data && (data.role === 'cms_admin' || data.role === 'super_admin')) {
          // User already has admin access, redirect to dashboard
          navigate('/cms', { replace: true });
        }
      }
    }
    
    checkAdminAccess();
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('User not found');
      }

      // Step 2: Check if user has admin role directly from the database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user role:', userError);
        throw new Error('Could not verify admin privileges');
      }

      const hasAdminRole = userData?.role === 'cms_admin' || userData?.role === 'super_admin';
      
      if (!hasAdminRole) {
        // If not admin, sign out and show error
        await supabase.auth.signOut();
        throw new Error('Unauthorized. You do not have admin privileges.');
      }

      // Step 3: Show success message and redirect
      toast.success('Login successful', {
        description: 'Welcome to the CMS dashboard'
      });
      
      // Navigate to CMS dashboard after successful login
      navigate('/cms', { replace: true });
    } catch (error: any) {
      toast.error('Error', {
        description: error.message || 'Invalid login credentials'
      });
      console.error('CMS login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-4 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">CMS Login</h1>
        
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  );
}
