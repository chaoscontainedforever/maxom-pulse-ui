
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { addUserToUsersTable } from '@/utils/addUserToUsersTable';
import { Role } from '@/context/auth/types';
import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';

export default function AddUserPage() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('chaoscontainedforever@gmail.com'); // Pre-filled with your email
  const [role, setRole] = useState<Role>('cms_admin'); // Default to cms_admin
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, profile } = useAuth();
  
  // Check if current user is an admin
  const isAdmin = profile?.role === 'super_admin' || profile?.role === 'cms_admin';
  
  // If not authenticated or not an admin, redirect to unauthorized page
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !email) {
      toast.error("Missing information", "User ID and email are required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await addUserToUsersTable(userId, email, role, firstName, lastName);
      
      if (result.success) {
        toast.success("Success", result.message);
      } else {
        toast.error("Error", result.message || 'Failed to add user');
      }
    } catch (error: any) {
      toast.error("Error", error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add User to Users Table</CardTitle>
          <CardDescription>
            Add an existing auth user to the users table
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID (from Supabase Auth)</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="8e587b07-51c5-4762-bfd4-86b5e771bfd0"
                required
              />
              <p className="text-xs text-gray-500">
                Find this in the Supabase Dashboard under Authentication → Users
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="cms_admin">CMS Admin</SelectItem>
                  <SelectItem value="business_owner">Business Owner</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name (Optional)</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name (Optional)</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Adding User...' : 'Add User to Table'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">
            This utility adds existing auth users to the users table
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
