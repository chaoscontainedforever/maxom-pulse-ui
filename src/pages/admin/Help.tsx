import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const faqItems = [
  {
    question: "How do I add a new business to the system?",
    answer: "Navigate to the Businesses section from the sidebar, then click on the 'Add Business' button in the top right corner. Fill out the required information in the form and click 'Save' to create the new business profile."
  },
  {
    question: "Can I customize the AI voice for different businesses?",
    answer: "Yes, each business can have its own customized voice settings. Go to the business profile, then click on the 'Voice Settings' tab. From there you can adjust the voice speed, tone, accent, and other parameters to match the business brand."
  },
  {
    question: "How do I view call recordings?",
    answer: "Call recordings can be accessed from the Call Analytics section. Click on a specific call from the calls list, and you'll be able to play the recording if it was enabled for that business. Note that call recording must be enabled in settings for the business."
  },
  {
    question: "What reports are available for analyzing call data?",
    answer: "Maxom.ai offers various reports such as call volume trends, peak call times, common customer inquiries, success rates, and business-specific performance metrics. You can access all these from the Reports section and export them as needed."
  },
  {
    question: "How do I set up notifications for missed calls?",
    answer: "Go to the Settings section, then click on the 'Notifications' tab. You can enable email, SMS, or push notifications for missed calls and configure who should receive these alerts and how frequently."
  },
  {
    question: "Can I integrate Maxom.ai with our existing CRM system?",
    answer: "Yes, Maxom.ai offers integrations with popular CRM systems. Go to Settings > Integrations to set up a connection with your existing CRM. We currently support Salesforce, HubSpot, Zoho CRM, and many others."
  },
];

const Help = () => {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Help & Support</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search for help articles..." className="pl-10" />
        </div>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guide">User Guide</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="guide" className="space-y-4">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  A quick guide to setting up and using Maxom.ai
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">1. Setting Up Your Account</h3>
                  <p className="text-gray-600">
                    After signing up, the first step is to complete your profile and company information.
                    This helps us customize the experience for your specific needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">2. Adding Your First Business</h3>
                  <p className="text-gray-600">
                    Navigate to the Businesses section and click "Add Business." Fill in the required details
                    such as name, phone number, business hours, and the types of calls you want Maxom.ai to handle.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">3. Training Your AI Voice</h3>
                  <p className="text-gray-600">
                    For each business, you'll want to customize how the AI responds. Create scripts for common
                    scenarios and teach the AI about your services, pricing, and policies.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">4. Testing Your Setup</h3>
                  <p className="text-gray-600">
                    Before going live, use our testing tools to simulate calls and ensure the AI is handling
                    them correctly. Make adjustments as needed to improve performance.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">5. Going Live</h3>
                  <p className="text-gray-600">
                    Once you're satisfied with the setup, activate the service for your business. You can
                    start with a percentage of calls handled by AI and gradually increase as you gain confidence.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Download Full User Guide (PDF)</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Introduction to Maxom.ai</p>
                    <p className="text-sm text-gray-500">3:24 min</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Setting Up a New Business</p>
                    <p className="text-sm text-gray-500">5:12 min</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Analyzing Call Data</p>
                    <p className="text-sm text-gray-500">4:45 min</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Advanced Voice Training</p>
                    <p className="text-sm text-gray-500">7:30 min</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2 hover:bg-gray-100 rounded-md">
                    <p className="font-medium">Use detailed scripts for better results</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md">
                    <p className="font-medium">Schedule weekly data reviews</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md">
                    <p className="font-medium">Customize greetings for each business</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md">
                    <p className="font-medium">Test new scripts during off-peak hours</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md">
                    <p className="font-medium">Use call recordings to improve accuracy</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">API Documentation</p>
                    <p className="text-sm text-gray-500">For technical integrations</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Best Practices Guide</p>
                    <p className="text-sm text-gray-500">Get the most out of Maxom.ai</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Script Templates</p>
                    <p className="text-sm text-gray-500">Industry-specific examples</p>
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-medium">Integrations Directory</p>
                    <p className="text-sm text-gray-500">Connect with your tools</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Contact Support Team</CardTitle>
                <CardDescription>
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="E.g., Technical issue, Billing question, etc." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    className="w-full min-h-[150px] p-3 border rounded-md" 
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachments (Optional)</Label>
                  <Input id="attachment" type="file" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Typical response time: Within 2 business hours
                </div>
                <Button>Submit Ticket</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Email Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">Send us an email directly</p>
                  <Button variant="outline" className="w-full">
                    support@maxom.ai
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Phone Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">Call us during business hours</p>
                  <Button variant="outline" className="w-full">
                    +1 (800) 555-0123
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Monday-Friday, 9am-6pm EST
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">Chat with a support agent</p>
                  <Button className="w-full">
                    Start Chat
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Currently online: 3 minute wait time
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Help;
