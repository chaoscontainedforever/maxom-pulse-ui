
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CompletionStep = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">Setup Complete!</h3>
      <p className="text-center text-muted-foreground mb-6 max-w-md">
        Your Maxom.ai voice assistant is ready to start taking calls. You can always adjust your settings later.
      </p>
      
      <div className="grid gap-4 w-full max-w-md">
        <div className="flex items-center p-4 border rounded-lg bg-muted/20">
          <div className="bg-primary/10 rounded-full p-2 mr-4">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">Business Information</h4>
            <p className="text-sm text-muted-foreground">Your business details are set up</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 border rounded-lg bg-muted/20">
          <div className="bg-primary/10 rounded-full p-2 mr-4">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">Voice Settings</h4>
            <p className="text-sm text-muted-foreground">Your voice assistant is configured</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 border rounded-lg bg-muted/20">
          <div className="bg-primary/10 rounded-full p-2 mr-4">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">Integrations</h4>
            <p className="text-sm text-muted-foreground">Connect your business systems</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-4 w-full max-w-md">
        <Button 
          className="w-full" 
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button variant="outline" className="w-full">
          View Tutorials
        </Button>
      </div>
      
      <div className="mt-8 p-4 border rounded-lg bg-amber-50 border-amber-200 w-full max-w-md">
        <h4 className="font-medium text-amber-800 mb-1">Need to update your phone system?</h4>
        <p className="text-sm text-amber-700 mb-3">
          To start receiving calls through Maxom.ai, you may need to update your phone system settings.
        </p>
        <Button variant="outline" size="sm" className="bg-amber-100 border-amber-300 text-amber-800">
          View Setup Guide
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
