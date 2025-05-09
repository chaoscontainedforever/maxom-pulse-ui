
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Check, ChevronRight } from "lucide-react";

import BusinessInfoStep from "./Steps/BusinessInfoStep";
import VoiceSettingsStep from "./Steps/VoiceSettingsStep";
import IntegrationsStep from "./Steps/IntegrationsStep";
import CompletionStep from "./Steps/CompletionStep";

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Steps configuration
  const steps = [
    { id: "business-info", title: "Business Information", component: BusinessInfoStep },
    { id: "voice-settings", title: "Voice Settings", component: VoiceSettingsStep },
    { id: "integrations", title: "Integrations", component: IntegrationsStep },
    { id: "completion", title: "Complete", component: CompletionStep },
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Set Up Your Business</h1>
      
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep 
                  ? "border-primary bg-primary text-white" 
                  : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-20 h-0.5 ${
                  index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
          
          <Tabs value={steps[currentStep].id}>
            {steps.map((step, index) => (
              <TabsContent key={step.id} value={step.id} className="mt-0">
                <step.component />
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="gap-2"
            >
              {currentStep === steps.length - 2 ? "Complete" : "Continue"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
