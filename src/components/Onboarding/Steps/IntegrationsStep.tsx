
import { Calendar, CreditCard, MessagesSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IntegrationsStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Connect Your Tools</h3>
        <p className="text-muted-foreground mb-4">
          Integrate with your existing systems to enhance your Maxom.ai experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Calendar Integration
              </CardTitle>
              <CardDescription>
                Connect your scheduling software to book appointments automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-muted">
                    Recommended
                  </Badge>
                </div>
                <p className="text-sm">
                  Works with Google Calendar, Calendly, Acuity, and more.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect Calendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Processing
              </CardTitle>
              <CardDescription>
                Accept payments and process orders through your calls.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Securely collect payments with Stripe, Square, or PayPal.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Connect Payment</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessagesSquare className="h-5 w-5 text-primary" />
                CRM System
              </CardTitle>
              <CardDescription>
                Connect your customer relationship management tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Works with Salesforce, HubSpot, Zoho CRM, and more.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Connect CRM</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Point of Sale (POS)
              </CardTitle>
              <CardDescription>
                Integrate with your point of sale system for orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Compatible with Square, Toast, Clover, and more.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Connect POS</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Don't see your tool?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We're constantly adding new integrations. Let us know what you need.
        </p>
        <Button variant="outline">Request Integration</Button>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          You can always add or manage integrations later from the Settings page.
        </p>
      </div>
    </div>
  );
};

export default IntegrationsStep;
