
import { useState } from "react";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, User, Plus, Edit, Trash2 } from "lucide-react";

// Mock data for roles and permissions
const roles = [
  { id: 1, name: "Super Admin", description: "Full system access and control", userCount: 3 },
  { id: 2, name: "Admin", description: "Administrative access with some restrictions", userCount: 5 },
  { id: 3, name: "Support", description: "Customer support with limited access", userCount: 8 },
  { id: 4, name: "Viewer", description: "Read-only access to data and reports", userCount: 12 },
  { id: 5, name: "Developer", description: "API and technical access", userCount: 6 }
];

// Mock permissions with categories
const permissions = [
  // Customer Management
  { id: 1, name: "View Customers", description: "Can view customer profiles", category: "Customer Management" },
  { id: 2, name: "Edit Customers", description: "Can edit customer details", category: "Customer Management" },
  { id: 3, name: "Delete Customers", description: "Can delete customer accounts", category: "Customer Management" },
  { id: 4, name: "Create Customers", description: "Can create new customers", category: "Customer Management" },
  
  // User Management
  { id: 5, name: "View Users", description: "Can view user accounts", category: "User Management" },
  { id: 6, name: "Edit Users", description: "Can edit user details", category: "User Management" },
  { id: 7, name: "Delete Users", description: "Can delete user accounts", category: "User Management" },
  { id: 8, name: "Create Users", description: "Can create new users", category: "User Management" },
  
  // Voice Settings
  { id: 9, name: "View Voice Settings", description: "Can view voice configuration", category: "Voice Settings" },
  { id: 10, name: "Edit Voice Settings", description: "Can edit voice configuration", category: "Voice Settings" },
  { id: 11, name: "Manage Voice Models", description: "Can add/edit voice models", category: "Voice Settings" },
  
  // System Settings
  { id: 12, name: "View System Settings", description: "Can view system configuration", category: "System Settings" },
  { id: 13, name: "Edit System Settings", description: "Can edit system configuration", category: "System Settings" },
  { id: 14, name: "Access API Keys", description: "Can view and manage API keys", category: "System Settings" },
  
  // Billing
  { id: 15, name: "View Billing", description: "Can view billing information", category: "Billing" },
  { id: 16, name: "Process Payments", description: "Can process and refund payments", category: "Billing" },
  { id: 17, name: "Edit Pricing", description: "Can edit pricing and plans", category: "Billing" }
];

// Mock data for role permissions mapping
const rolePermissions: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // Super Admin has all permissions
  2: [1, 2, 4, 5, 6, 8, 9, 10, 12, 15], // Admin has most but not dangerous permissions
  3: [1, 5, 9, 15], // Support has only view permissions
  4: [1, 5, 9, 12, 15], // Viewer has only read permissions
  5: [1, 5, 9, 12, 14] // Developer has API access but limited other access
};

const SuperAdminPermissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  
  // Filter roles based on search
  const filteredRoles = roles.filter(role => {
    return (
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Group permissions by category
  const getPermissionsByCategory = () => {
    const categories: Record<string, typeof permissions> = {};
    
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    
    return categories;
  };

  // Check if permission is assigned to role
  const hasPermission = (roleId: number, permissionId: number) => {
    return rolePermissions[roleId]?.includes(permissionId) || false;
  };

  const permissionsByCategory = getPermissionsByCategory();

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Permissions</h1>
          <p className="text-muted-foreground">
            Configure access controls and user roles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Roles</CardTitle>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search roles..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  {filteredRoles.map(role => (
                    <div 
                      key={role.id}
                      className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${selectedRole === role.id ? 'border-primary bg-primary/10' : 'border-border'}`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{role.name}</div>
                        <Badge variant="outline">{role.userCount} users</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedRole !== null 
                        ? `Permissions for ${roles.find(r => r.id === selectedRole)?.name}` 
                        : "Select a role to manage permissions"}
                    </CardTitle>
                    {selectedRole !== null && (
                      <CardDescription>
                        Configure what actions users with this role can perform
                      </CardDescription>
                    )}
                  </div>
                  
                  {selectedRole !== null && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Role
                      </Button>
                      {selectedRole !== 1 && ( // Don't allow deleting Super Admin
                        <Button variant="outline" size="sm" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                {selectedRole === null ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Shield className="h-16 w-16 text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">Select a role</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose a role from the list to manage its permissions
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                      <div key={category}>
                        <h3 className="text-lg font-medium mb-3">{category}</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Permission</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="w-[100px]">Enabled</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {categoryPermissions.map(permission => (
                              <TableRow key={permission.id}>
                                <TableCell className="font-medium">{permission.name}</TableCell>
                                <TableCell>{permission.description}</TableCell>
                                <TableCell>
                                  <input 
                                    type="checkbox" 
                                    checked={hasPermission(selectedRole, permission.id)}
                                    className="h-5 w-5 rounded border-gray-300"
                                    disabled={selectedRole === 1} // Super Admin permissions cannot be modified
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                    
                    {selectedRole !== 1 && (
                      <div className="flex justify-end pt-4">
                        <Button>Save Permissions</Button>
                      </div>
                    )}
                    
                    {selectedRole === 1 && (
                      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-3 text-sm mt-4">
                        <div className="font-medium">Super Admin Role</div>
                        <p>Super Admin permissions cannot be modified as this role must maintain full system access.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {selectedRole !== null && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Users with this role</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          <User className="h-8 w-8 mx-auto mb-2 opacity-20" />
                          <p>Select "Edit Role" to view and manage users with this role</p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminPermissions;
