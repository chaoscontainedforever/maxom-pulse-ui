
import { useState } from "react";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Send,
  MessageSquare, 
  Mail,
  Settings,
  Eye,
  FileEdit,
  Trash2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
  
// Mock data for notifications templates
const notificationTemplates = [
  { 
    id: 1, 
    name: "Welcome Email", 
    type: "email", 
    subject: "Welcome to Maxom.ai!",
    lastUpdated: "2023-05-01",
    active: true
  },
  { 
    id: 2, 
    name: "Password Reset", 
    type: "email", 
    subject: "Reset Your Maxom.ai Password",
    lastUpdated: "2023-04-25",
    active: true
  },
  { 
    id: 3, 
    name: "Call Summary", 
    type: "email", 
    subject: "Your Daily Call Summary from Maxom.ai",
    lastUpdated: "2023-05-05",
    active: true
  },
  { 
    id: 4, 
    name: "Account Expiring", 
    type: "email", 
    subject: "Your Maxom.ai Subscription is Expiring Soon",
    lastUpdated: "2023-04-18",
    active: true
  },
  { 
    id: 5, 
    name: "New Login Notification", 
    type: "sms", 
    subject: "New login detected on your Maxom.ai account",
    lastUpdated: "2023-04-10",
    active: false
  },
  { 
    id: 6, 
    name: "Missed Call Alert", 
    type: "sms", 
    subject: "You have a missed call from your Maxom.ai number",
    lastUpdated: "2023-05-02",
    active: true
  },
  { 
    id: 7, 
    name: "New Voicemail", 
    type: "push", 
    subject: "New voicemail received",
    lastUpdated: "2023-05-03",
    active: true
  },
];

const SuperAdminNotifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    enablePushNotifications: false,
    emailCooldownMinutes: 30,
    smsCooldownMinutes: 60,
    maxDailyNotifications: 5
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState<typeof notificationTemplates[0] | null>(null);

  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "push": return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationTypeBadge = (type: string) => {
    switch (type) {
      case "email": 
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Email</Badge>;
      case "sms": 
        return <Badge className="bg-green-100 text-green-800 border-green-200">SMS</Badge>;
      case "push": 
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Push</Badge>;
      default: 
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Manage system-wide notification templates and settings
          </p>
        </div>
        
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="templates" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileEdit className="h-4 w-4 mr-2" />
              Notification Templates
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </TabsTrigger>
            <TabsTrigger 
              value="compose"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Send className="h-4 w-4 mr-2" />
              Compose Message
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notification Templates</CardTitle>
                    <CardDescription>
                      Manage email, SMS, and push notification templates
                    </CardDescription>
                  </div>
                  
                  <Button>
                    Create Template
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {notificationTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{getNotificationTypeBadge(template.type)}</TableCell>
                        <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                        <TableCell>{formatDate(template.lastUpdated)}</TableCell>
                        <TableCell>
                          <Badge variant={template.active ? "default" : "secondary"}>
                            {template.active ? "Active" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedTemplate(template)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {selectedTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>Template Preview: {selectedTemplate.name}</CardTitle>
                      {getNotificationTypeBadge(selectedTemplate.type)}
                    </div>
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                      Close Preview
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-background">
                    <div className="mb-4">
                      <strong>Subject:</strong> {selectedTemplate.subject}
                    </div>
                    <div>
                      <strong>Body:</strong>
                      <div className="mt-2 p-4 border rounded-md bg-white">
                        <p>This is a sample preview of the {selectedTemplate.name} template.</p>
                        <p className="mt-2">The actual content would be customizable with template variables for personalization.</p>
                        <p className="mt-2">You can edit this template to change the content and layout.</p>
                        {selectedTemplate.type === "email" && (
                          <div className="mt-4 text-sm text-gray-500">
                            <p>Best regards,</p>
                            <p>The Maxom.ai Team</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system-wide notification preferences and limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Channels</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <Label htmlFor="enable-email">Enable Email Notifications</Label>
                          </div>
                          <Switch 
                            id="enable-email" 
                            checked={notificationSettings.enableEmailNotifications}
                            onCheckedChange={() => toggleSetting('enableEmailNotifications')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4" />
                            <Label htmlFor="enable-sms">Enable SMS Notifications</Label>
                          </div>
                          <Switch 
                            id="enable-sms" 
                            checked={notificationSettings.enableSmsNotifications}
                            onCheckedChange={() => toggleSetting('enableSmsNotifications')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <Label htmlFor="enable-push">Enable Push Notifications</Label>
                          </div>
                          <Switch 
                            id="enable-push" 
                            checked={notificationSettings.enablePushNotifications}
                            onCheckedChange={() => toggleSetting('enablePushNotifications')}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Rate Limiting</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="email-cooldown">Email Cooldown (minutes)</Label>
                          <Input 
                            id="email-cooldown"
                            type="number" 
                            value={notificationSettings.emailCooldownMinutes}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              emailCooldownMinutes: parseInt(e.target.value) || 0
                            }))}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="sms-cooldown">SMS Cooldown (minutes)</Label>
                          <Input 
                            id="sms-cooldown"
                            type="number" 
                            value={notificationSettings.smsCooldownMinutes}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              smsCooldownMinutes: parseInt(e.target.value) || 0
                            }))}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="max-daily">Max Daily Notifications</Label>
                          <Input 
                            id="max-daily"
                            type="number" 
                            value={notificationSettings.maxDailyNotifications}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              maxDailyNotifications: parseInt(e.target.value) || 0
                            }))}
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Compose System Message</CardTitle>
                <CardDescription>
                  Send a notification to all customers or specific customer segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message-type">Message Type</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="email-type" name="message-type" defaultChecked />
                        <Label htmlFor="email-type">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="sms-type" name="message-type" />
                        <Label htmlFor="sms-type">SMS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="push-type" name="message-type" />
                        <Label htmlFor="push-type">Push</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="audience">Audience</Label>
                    <select id="audience" className="w-full mt-1 p-2 border rounded-md">
                      <option value="all">All Customers</option>
                      <option value="active">Active Customers Only</option>
                      <option value="trial">Trial Users</option>
                      <option value="enterprise">Enterprise Customers</option>
                      <option value="custom">Custom Segment</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message-subject">Subject Line</Label>
                    <Input id="message-subject" placeholder="Enter subject line here..." className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message-body">Message Content</Label>
                    <Textarea
                      id="message-body"
                      placeholder="Write your message here..."
                      className="mt-1 min-h-[200px]"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Send className="h-4 w-4" />
                      Test Message
                    </Button>
                    <Button className="gap-2 ml-auto">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminNotifications;
