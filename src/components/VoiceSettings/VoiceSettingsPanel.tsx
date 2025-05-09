
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceConfig from "@/components/VoiceSettings/VoiceConfig";
import BusinessHours from "@/components/VoiceSettings/BusinessHours";
import GreetingsEditor from "@/components/VoiceSettings/GreetingsEditor";
import AdvancedSettings from "@/components/VoiceSettings/AdvancedSettings";

const VoiceSettingsPanel = () => {
  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  
  const handleSave = () => {
    // Simulate saving
    setSavedStatus("saving");
    setTimeout(() => {
      setSavedStatus("saved");
      setTimeout(() => {
        setSavedStatus(null);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="container p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Voice Settings</h1>
          <p className="text-muted-foreground">
            Configure your Maxom.ai voice assistant to match your business needs.
          </p>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={savedStatus === "saving"}
          className="mt-4 md:mt-0 min-w-[100px]"
        >
          {savedStatus === "saving" ? "Saving..." : savedStatus === "saved" ? "Saved!" : "Save Changes"}
        </Button>
      </div>
      
      <Tabs defaultValue="voice" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent">
          <TabsTrigger 
            value="voice" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Voice
          </TabsTrigger>
          <TabsTrigger 
            value="hours"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Business Hours
          </TabsTrigger>
          <TabsTrigger 
            value="greetings"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Greetings
          </TabsTrigger>
          <TabsTrigger 
            value="advanced"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <TabsContent value="voice" className="m-0">
            <CardHeader>
              <CardTitle>Voice Configuration</CardTitle>
              <CardDescription>
                Customize how your AI voice assistant sounds when answering calls.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VoiceConfig />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="hours" className="m-0">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set when your voice assistant should answer calls.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessHours />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="greetings" className="m-0">
            <CardHeader>
              <CardTitle>Greetings Editor</CardTitle>
              <CardDescription>
                Customize the messages callers will hear.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GreetingsEditor />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="advanced" className="m-0">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced behavior for your voice assistant.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedSettings />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default VoiceSettingsPanel;
