
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GreetingsEditor = () => {
  const [greetings, setGreetings] = useState({
    default: "Thank you for calling [Business Name]. This is our virtual assistant. How may I help you today?",
    afterHours: "Thank you for calling [Business Name]. We're currently closed. Our business hours are [Business Hours]. Please leave a message and we'll get back to you during our normal business hours.",
    holiday: "Thank you for calling [Business Name]. We're currently closed for the holiday. We will reopen on [Reopen Date]. Please leave a message and we'll get back to you when we return.",
    voicemail: "Please leave your name, phone number, and a brief message after the tone. We'll get back to you as soon as possible."
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState("default");
  
  const handleChange = (key: keyof typeof greetings, value: string) => {
    setGreetings({
      ...greetings,
      [key]: value
    });
  };
  
  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="font-medium mb-2">Available Variables</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="bg-background rounded p-2 border">[Business Name]</div>
          <div className="bg-background rounded p-2 border">[Business Hours]</div>
          <div className="bg-background rounded p-2 border">[Phone Number]</div>
          <div className="bg-background rounded p-2 border">[Website]</div>
          <div className="bg-background rounded p-2 border">[Reopen Date]</div>
          <div className="bg-background rounded p-2 border">[Current Date]</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Include these variables in your greetings and they'll be automatically replaced with your business information.
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="default">Main Greeting</TabsTrigger>
          <TabsTrigger value="afterHours">After Hours</TabsTrigger>
          <TabsTrigger value="holiday">Holiday</TabsTrigger>
          <TabsTrigger value="voicemail">Voicemail</TabsTrigger>
        </TabsList>
        
        <TabsContent value="default">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Main Greeting (During Business Hours)</Label>
              <Textarea
                value={greetings.default}
                onChange={(e) => handleChange('default', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-between">
              <Button onClick={() => handleChange('default', "Thank you for calling [Business Name]. This is our virtual assistant. How may I help you today?")} variant="outline">
                Reset to Default
              </Button>
              <Button onClick={handlePlay} disabled={isPlaying}>
                {isPlaying ? "Playing..." : "Preview"}
                {!isPlaying && <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="afterHours">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>After Hours Greeting</Label>
              <Textarea
                value={greetings.afterHours}
                onChange={(e) => handleChange('afterHours', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-between">
              <Button onClick={() => handleChange('afterHours', "Thank you for calling [Business Name]. We're currently closed. Our business hours are [Business Hours]. Please leave a message and we'll get back to you during our normal business hours.")} variant="outline">
                Reset to Default
              </Button>
              <Button onClick={handlePlay} disabled={isPlaying}>
                {isPlaying ? "Playing..." : "Preview"}
                {!isPlaying && <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="holiday">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Holiday Greeting</Label>
              <Textarea
                value={greetings.holiday}
                onChange={(e) => handleChange('holiday', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-between">
              <Button onClick={() => handleChange('holiday', "Thank you for calling [Business Name]. We're currently closed for the holiday. We will reopen on [Reopen Date]. Please leave a message and we'll get back to you when we return.")} variant="outline">
                Reset to Default
              </Button>
              <Button onClick={handlePlay} disabled={isPlaying}>
                {isPlaying ? "Playing..." : "Preview"}
                {!isPlaying && <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="voicemail">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voicemail Greeting</Label>
              <Textarea
                value={greetings.voicemail}
                onChange={(e) => handleChange('voicemail', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-between">
              <Button onClick={() => handleChange('voicemail', "Please leave your name, phone number, and a brief message after the tone. We'll get back to you as soon as possible.")} variant="outline">
                Reset to Default
              </Button>
              <Button onClick={handlePlay} disabled={isPlaying}>
                {isPlaying ? "Playing..." : "Preview"}
                {!isPlaying && <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-primary/10 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Custom Greetings for Special Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-sm mb-1 block">Event Name</Label>
            <Input placeholder="Summer Sale" />
          </div>
          <div>
            <Label className="text-sm mb-1 block">Active Dates</Label>
            <div className="flex items-center gap-2">
              <Input type="date" className="flex-1" />
              <span className="text-sm">to</span>
              <Input type="date" className="flex-1" />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <Label className="text-sm mb-1 block">Event Greeting</Label>
          <Textarea placeholder="Thank you for calling [Business Name]. We're having our special Summer Sale event! How can we help you today?" rows={3} />
        </div>
        
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Add Event Greeting
        </Button>
      </div>
    </div>
  );
};

export default GreetingsEditor;
