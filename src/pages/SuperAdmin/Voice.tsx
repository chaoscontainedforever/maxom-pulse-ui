
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Mic, Play, Pause, Download } from "lucide-react";
import { useState } from "react";

// Mock data for voice models
const mockVoiceModels = [
  { id: 1, name: "Emma", gender: "Female", language: "English (US)", quality: "Premium", usageCount: 1245, status: "active" },
  { id: 2, name: "Michael", gender: "Male", language: "English (US)", quality: "Premium", usageCount: 987, status: "active" },
  { id: 3, name: "Sophie", gender: "Female", language: "English (UK)", quality: "Standard", usageCount: 654, status: "active" },
  { id: 4, name: "David", gender: "Male", language: "English (UK)", quality: "Standard", usageCount: 432, status: "inactive" },
  { id: 5, name: "Isabella", gender: "Female", language: "Spanish", quality: "Premium", usageCount: 321, status: "active" },
  { id: 6, name: "Carlos", gender: "Male", language: "Spanish", quality: "Premium", usageCount: 210, status: "active" },
  { id: 7, name: "Amelie", gender: "Female", language: "French", quality: "Standard", usageCount: 198, status: "active" },
  { id: 8, name: "Pierre", gender: "Male", language: "French", quality: "Standard", usageCount: 175, status: "inactive" },
];

// Mock data for global voice settings
const mockVoiceSettings = {
  defaultVoiceId: 1,
  defaultSpeed: 1.0,
  defaultPitch: 1.0,
  maxConcurrentCalls: 500,
  transcriptionEnabled: true,
  analyticsEnabled: true,
  defaultHoursOfOperation: "9:00 AM - 5:00 PM",
  defaultTimeZone: "America/New_York"
};

const SuperAdminVoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  // Filter voice models based on search
  const filteredVoices = mockVoiceModels.filter(voice => {
    return (
      voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voice.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voice.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const togglePlay = (id: number) => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Voice Settings</h1>
          <p className="text-muted-foreground">
            Manage voice models and global voice settings for all customers
          </p>
        </div>
        
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="models" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice Models
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Global Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Voice Models Library</CardTitle>
                  <CardDescription>
                    Available voice models that customers can use
                  </CardDescription>
                </div>
                
                <Button>
                  Add New Voice
                </Button>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search voices by name, language..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredVoices.map((voice) => (
                      <TableRow key={voice.id}>
                        <TableCell className="font-medium">{voice.name}</TableCell>
                        <TableCell>{voice.gender}</TableCell>
                        <TableCell>{voice.language}</TableCell>
                        <TableCell>
                          <Badge variant={voice.quality === "Premium" ? "default" : "secondary"}>
                            {voice.quality}
                          </Badge>
                        </TableCell>
                        <TableCell>{voice.usageCount} calls</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={voice.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800"}
                          >
                            {voice.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => togglePlay(voice.id)}>
                              {isPlaying === voice.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredVoices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No voice models found matching your search.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Voice Settings</CardTitle>
                <CardDescription>
                  System-wide voice settings that apply to all customers
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Voice</label>
                      <select className="w-full p-2 border rounded">
                        {mockVoiceModels.map(voice => (
                          <option key={voice.id} value={voice.id} selected={voice.id === mockVoiceSettings.defaultVoiceId}>
                            {voice.name} ({voice.language})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Speech Rate</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          defaultValue={mockVoiceSettings.defaultSpeed}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{mockVoiceSettings.defaultSpeed}x</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Pitch</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0.5"
                          max="1.5"
                          step="0.1"
                          defaultValue={mockVoiceSettings.defaultPitch}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{mockVoiceSettings.defaultPitch}x</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Max Concurrent Calls</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        defaultValue={mockVoiceSettings.maxConcurrentCalls}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Hours of Operation</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        defaultValue={mockVoiceSettings.defaultHoursOfOperation}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Default Time Zone</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        defaultValue={mockVoiceSettings.defaultTimeZone}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="transcription" 
                        defaultChecked={mockVoiceSettings.transcriptionEnabled}
                      />
                      <label htmlFor="transcription">Enable Transcription by Default</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="analytics" 
                        defaultChecked={mockVoiceSettings.analyticsEnabled}
                      />
                      <label htmlFor="analytics">Enable Call Analytics by Default</label>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Settings</Button>
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

export default SuperAdminVoice;
