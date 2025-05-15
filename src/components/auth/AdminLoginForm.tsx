
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface AdminLoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AdminLoginForm = ({ onSubmit, isLoading, error }: AdminLoginFormProps) => {
  const [email, setEmail] = useState('admin@maxom.ai');
  const [password, setPassword] = useState('Admin123!');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="admin-email">Email</Label>
        <Input 
          id="admin-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@maxom.ai"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <Input 
          id="admin-password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
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
  );
};

export default AdminLoginForm;
