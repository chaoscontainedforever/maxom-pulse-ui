
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Plus } from "lucide-react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  connected: boolean;
}

const IntegrationsStep = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "pos",
      name: "Point of Sale (POS)",
      description: "Connect your POS system to automatically process orders and payments.",
      logo: "pos.svg",
      connected: false,
    },
    {
      id: "crm",
      name: "Customer Relationship Management (CRM)",
      description: "Sync customer data with your CRM for better customer insights.",
      logo: "crm.svg",
      connected: false,
    },
    {
      id: "calendar",
      name: "Calendar Integration",
      description: "Connect to your calendar to manage appointments and schedules.",
      logo: "calendar.svg",
      connected: false,
    },
    {
      id: "payment",
      name: "Payment Processor",
      description: "Process payments securely through your preferred payment provider.",
      logo: "payment.svg",
      connected: false,
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Connect Your Business Tools</h3>
        <p className="text-muted-foreground mb-6">
          Integrate with your existing business tools to maximize efficiency. You can always update these later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="p-4 relative">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-2xl">{integration.id.charAt(0).toUpperCase()}</span>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => toggleConnection(integration.id)}
                  variant={integration.connected ? "default" : "outline"}
                  className="w-full"
                >
                  {integration.connected ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Connected
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Connect
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/40 rounded-lg p-4 mt-8">
        <h4 className="font-medium mb-2">Need a custom integration?</h4>
        <p className="text-sm text-muted-foreground">
          We can help you connect to your specific business tools. Contact our support team for assistance with custom integrations.
        </p>
        <Button variant="link" className="mt-2 h-auto p-0">
          Request custom integration
        </Button>
      </div>
    </div>
  );
};

export default IntegrationsStep;
