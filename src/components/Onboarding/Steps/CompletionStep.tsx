
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompletionStep = () => {
  const navigate = useNavigate();
  
  const handleGoToDashboard = () => {
    navigate("/business-admin");
  };

  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-2">Your business is set up!</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Congratulations! Your business is now set up with Maxom.ai. You can now access your business dashboard and start managing your AI voice assistant.
      </p>

      <div className="space-y-4 max-w-xs mx-auto">
        <div className="bg-muted rounded-lg p-3 text-left">
          <h4 className="font-medium">What's next:</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</div>
              <span>Customize your voice assistant settings</span>
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</div>
              <span>Test your AI assistant with a sample call</span>
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">3</div>
              <span>Configure business-specific features</span>
            </li>
          </ul>
        </div>

        <Button onClick={handleGoToDashboard} className="w-full">
          Go to Business Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
