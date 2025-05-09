
import { useState } from "react";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Globe,
  FileKey,
  CreditCard,
  Box,
  Database,
  Shield,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for system settings
const mockSystemStatus = {
  apiStatus: "operational",
  databaseStatus: "operational",
  voiceStatus: "operational",
  storageBucketStatus: "degraded",
  lastHealthcheck: "2023-05-09T14:30:00",
  uptime: "99.98%"
};

const mockLimits = {
  maxCustomers: 10000,
  maxUsersPerCustomer: 50,
  maxConcurrentCalls: 1000,
  storageLimit: "500GB",
  voiceMinutesMonthly: 100000,
  apiRequestsPerDay: 1000000
};

const mockApiKeys = [
  { id: 1, name: "Voice API Production", prefix: "vapi_prod_", lastUsed: "2023-05-09T10:15:00", active: true },
  { id: 2, name: "Analytics API Production", prefix: "aapi_prod_", lastUsed: "2023-05-08T16:45:00", active: true },
  { id: 3, name: "Customer API Staging", prefix: "capi_stag_", lastUsed: "2023-05-05T11:20:00", active: true },
  { id: 4, name: "Deprecated Key", prefix: "dep_key_", lastUsed: "2023-04-15T09:30:00", active: false },
];

const SuperAdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "Maxom.ai Platform",
    customerDomain: "app.maxom.ai",
    adminDomain: "admin.maxom.ai",
    supportEmail: "support@maxom.ai",
    maintenanceMode: false,
    allowNewSignups: true,
    requireEmailVerification: true,
    defaultTimeZone: "America/New_York"
  });

  const toggleSetting = (setting: keyof typeof generalSettings) => {
    if (typeof generalSettings[setting] === 'boolean') {
      setGeneralSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Operational</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Degraded</Badge>;
      case "down":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Down</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Manage global platform configuration and system settings
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="api"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileKey className="h-4 w-4 mr-2" />
              API & Integration
            </TabsTrigger>
            <TabsTrigger 
              value="limits"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Box className="h-4 w-4 mr-2" />
              System Limits
            </TabsTrigger>
            <TabsTrigger 
              value="status"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              System Status
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="system-name">System Name</Label>
                      <Input 
                        id="system-name"
                        value={generalSettings.systemName}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          systemName: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="customer-domain">Customer Domain</Label>
                      <Input 
                        id="customer-domain"
                        value={generalSettings.customerDomain}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          customerDomain: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="admin-domain">Admin Domain</Label>
                      <Input 
                        id="admin-domain"
                        value={generalSettings.adminDomain}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          adminDomain: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input 
                        id="support-email"
                        value={generalSettings.supportEmail}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          supportEmail: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">Default Time Zone</Label>
                      <Input 
                        id="timezone"
                        value={generalSettings.defaultTimeZone}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          defaultTimeZone: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      </div>
                      <Switch 
                        id="maintenance-mode" 
                        checked={generalSettings.maintenanceMode}
                        onCheckedChange={() => toggleSetting('maintenanceMode')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <Label htmlFor="allow-signups">Allow New Signups</Label>
                      </div>
                      <Switch 
                        id="allow-signups" 
                        checked={generalSettings.allowNewSignups}
                        onCheckedChange={() => toggleSetting('allowNewSignups')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <Label htmlFor="email-verification">Require Email Verification</Label>
                      </div>
                      <Switch 
                        id="email-verification" 
                        checked={generalSettings.requireEmailVerification}
                        onCheckedChange={() => toggleSetting('requireEmailVerification')}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for system-wide integrations
                    </CardDescription>
                  </div>
                  
                  <Button>
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApiKeys.map((key) => (
                    <Card key={key.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                          <div>
                            <p className="font-medium">{key.name}</p>
                            <div className="flex items-center mt-1">
                              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                {key.prefix}•••••••••••••
                              </code>
                              <Badge 
                                className={`ml-2 ${key.active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {key.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            Last used: {formatDate(key.lastUsed)}
                          </div>
                          
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Copy</Button>
                            <Button variant="outline" size="sm">{key.active ? 'Revoke' : 'Activate'}</Button>
                            <Button variant="outline" size="sm">Regenerate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Third-Party Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Twilio</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="twilio-sid">Account SID</Label>
                            <Input id="twilio-sid" type="password" value="••••••••••••••••••••••••" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="twilio-token">Auth Token</Label>
                            <Input id="twilio-token" type="password" value="••••••••••••••••••••••••" className="mt-1" />
                          </div>
                          <div className="pt-2">
                            <Button size="sm">Update</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">OpenAI</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="openai-key">API Key</Label>
                            <Input id="openai-key" type="password" value="••••••••••••••••••••••••" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="openai-model">Default Model</Label>
                            <select id="openai-model" className="w-full mt-1 p-2 border rounded-md">
                              <option value="gpt-4">GPT-4</option>
                              <option value="gpt-3.5-turbo" selected>GPT-3.5 Turbo</option>
                              <option value="gpt-3">GPT-3</option>
                            </select>
                          </div>
                          <div className="pt-2">
                            <Button size="sm">Update</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="limits">
            <Card>
              <CardHeader>
                <CardTitle>System Limits Configuration</CardTitle>
                <CardDescription>
                  Set resource limits for the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="max-customers">Maximum Customers</Label>
                      <Input 
                        id="max-customers"
                        type="number" 
                        value={mockLimits.maxCustomers}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="max-users">Max Users per Customer</Label>
                      <Input 
                        id="max-users"
                        type="number" 
                        value={mockLimits.maxUsersPerCustomer}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="max-calls">Max Concurrent Calls</Label>
                      <Input 
                        id="max-calls"
                        type="number" 
                        value={mockLimits.maxConcurrentCalls}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="storage-limit">Storage Limit</Label>
                      <Input 
                        id="storage-limit"
                        value={mockLimits.storageLimit}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="voice-minutes">Voice Minutes Monthly</Label>
                      <Input 
                        id="voice-minutes"
                        type="number" 
                        value={mockLimits.voiceMinutesMonthly}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="api-requests">API Requests per Day</Label>
                      <Input 
                        id="api-requests"
                        type="number" 
                        value={mockLimits.apiRequestsPerDay}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Limits</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Current status of system components and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">API Service</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">
                            {getStatusBadge(mockSystemStatus.apiStatus)}
                          </div>
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Database</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">
                            {getStatusBadge(mockSystemStatus.databaseStatus)}
                          </div>
                          <Database className="h-6 w-6 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Voice Service</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">
                            {getStatusBadge(mockSystemStatus.voiceStatus)}
                          </div>
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Storage Buckets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">
                            {getStatusBadge(mockSystemStatus.storageBucketStatus)}
                          </div>
                          <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Last Healthcheck</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-medium">
                          {formatDate(mockSystemStatus.lastHealthcheck)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Uptime</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-medium">
                          {mockSystemStatus.uptime}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    Run System Health Check
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Recent system events and logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md p-4 font-mono text-xs text-green-400 h-64 overflow-auto">
                  <div>[2023-05-09 14:30:00] INFO: Healthcheck completed successfully</div>
                  <div>[2023-05-09 14:28:15] INFO: API Service healthcheck passed</div>
                  <div>[2023-05-09 14:28:12] INFO: Voice Service healthcheck passed</div>
                  <div>[2023-05-09 14:28:09] WARNING: Storage Bucket response time degraded (432ms)</div>
                  <div>[2023-05-09 14:28:05] INFO: Database healthcheck passed</div>
                  <div>[2023-05-09 14:00:00] INFO: Scheduled backup completed</div>
                  <div>[2023-05-09 13:45:22] INFO: New customer signup: Acme Industries</div>
                  <div>[2023-05-09 13:30:15] INFO: System settings updated by admin user (admin@maxom.ai)</div>
                  <div>[2023-05-09 12:15:42] INFO: Voice model Emma updated</div>
                  <div>[2023-05-09 10:30:00] INFO: Daily analytics roll-up complete</div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline">Download Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminSettings;
