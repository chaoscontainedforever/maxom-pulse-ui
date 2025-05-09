
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Users, Settings, Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VoiceSettingsPanel from "@/components/VoiceSettings/VoiceSettingsPanel";
import UserManagement from "@/components/SuperAdmin/UserManagement";
import { fetchUserProfileById } from "@/lib/api";

const CustomerView = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Fetch customer data
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customerId ? fetchUserProfileById(customerId) : null,
  });
  
  const startImpersonation = () => {
    // In a real app, this would use proper authentication to impersonate
    setIsImpersonating(true);
    toast({
      title: "Impersonation Mode Active",
      description: `You are now viewing the application as ${customer?.first_name || 'Customer'}`,
    });
  };

  const sendCommunication = (type: string) => {
    toast({
      title: `${type} Sent`,
      description: `Your ${type.toLowerCase()} has been sent to ${customer?.first_name || 'the customer'}.`,
    });
  };

  if (isLoading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout isImpersonating={isImpersonating} impersonatedUser={customer?.first_name}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/super-admin')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{customer?.first_name || 'Customer'} {customer?.last_name || 'Account'}</h1>
              <p className="text-muted-foreground">Customer ID: {customerId}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button onClick={() => sendCommunication("Email")} className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button onClick={() => sendCommunication("Text")} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Text
            </Button>
            <Button onClick={() => sendCommunication("Call")} className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button 
              variant={isImpersonating ? "destructive" : "secondary"} 
              onClick={startImpersonation} 
              disabled={isImpersonating}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              {isImpersonating ? "Impersonating" : "Login as Customer"}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="voice-settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Voice Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <UserManagement customerId={customerId} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="voice-settings">
            <VoiceSettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default CustomerView;
