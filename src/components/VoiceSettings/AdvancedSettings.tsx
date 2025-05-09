
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AdvancedSettings = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium">Call Handling</h3>
            <p className="text-sm text-muted-foreground">
              Configure how the voice assistant processes and routes calls
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Max Call Duration</Label>
              </div>
              <Select defaultValue="120">
                <SelectTrigger>
                  <SelectValue placeholder="Select maximum call time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="180">3 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="600">10 minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Maximum time the AI will stay on a call before requiring human intervention
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Call Forwarding Logic</Label>
              <Select defaultValue="simple">
                <SelectTrigger>
                  <SelectValue placeholder="Select forwarding logic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple (Direct Transfer)</SelectItem>
                  <SelectItem value="conditional">Conditional (Based on Input)</SelectItem>
                  <SelectItem value="round-robin">Round-Robin (Team Distribution)</SelectItem>
                  <SelectItem value="skill-based">Skill-Based Routing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="native-language" />
              <label
                htmlFor="native-language"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable native language detection
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="transcripts" defaultChecked />
              <label
                htmlFor="transcripts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save call transcripts
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Call Transfer Threshold</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Transfer Most Calls)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Minimize Transfers)</SelectItem>
                  <SelectItem value="custom">Custom Settings</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Determines how readily the AI transfers calls to a human
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Call Recording</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select recording option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Record All Calls</SelectItem>
                  <SelectItem value="none">Don't Record</SelectItem>
                  <SelectItem value="consent">Record with Consent Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="call-interrupt" defaultChecked />
                <label
                  htmlFor="call-interrupt"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Allow customers to interrupt AI
                </label>
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                Enables callers to speak over the AI to interrupt responses
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium">Knowledge Base & Responses</h3>
            <p className="text-sm text-muted-foreground">
              Configure what information your voice assistant has access to
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <Separator />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-medium">
              Prohibited Topics & Words
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <Label className="text-sm">Topics to Avoid</Label>
                <Input placeholder="Enter topics separated by commas" defaultValue="pricing, refund policy, competitors" />
                
                <Label className="text-sm mt-4">Prohibited Words/Phrases</Label>
                <Input placeholder="Enter words separated by commas" />
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="auto-transfer" defaultChecked />
                  <label
                    htmlFor="auto-transfer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Auto-transfer when prohibited topics arise
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-medium">
              Custom Knowledge Files
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-medium text-sm">Menu Items.pdf</div>
                    <div className="text-xs text-muted-foreground">Updated 3 days ago</div>
                  </div>
                  <Button variant="outline" size="sm">Replace</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-medium text-sm">Business Policies.docx</div>
                    <div className="text-xs text-muted-foreground">Updated 1 week ago</div>
                  </div>
                  <Button variant="outline" size="sm">Replace</Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  Upload New Document
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Upload documents containing information you want your AI to access when answering questions.
                  Supported formats: PDF, DOCX, TXT, CSV
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-medium">
              Custom Voice Commands
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Trigger Phrase</Label>
                    <Input placeholder="When customer says..." defaultValue="I want to speak to a person" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Action</Label>
                    <Select defaultValue="transfer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transfer">Transfer to Agent</SelectItem>
                        <SelectItem value="message">Play Message</SelectItem>
                        <SelectItem value="webhook">Trigger Webhook</SelectItem>
                        <SelectItem value="end">End Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  Add Command
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Create custom voice commands that trigger specific actions when detected.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium">Technical Settings</h3>
            <p className="text-sm text-muted-foreground">
              Advanced configuration options for developers
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <Input placeholder="https://" />
            <p className="text-xs text-muted-foreground">
              Send call data to your system in real-time
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>API Authentication Key</Label>
            <div className="flex gap-2">
              <Input type="password" value="••••••••••••••••" readOnly />
              <Button variant="outline">Generate</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for secure API access
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
        <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
        <p className="text-xs mb-4">
          These actions cannot be undone. Please be certain.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Reset All Settings
          </Button>
          <Button variant="destructive" size="sm">
            Delete Voice Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
