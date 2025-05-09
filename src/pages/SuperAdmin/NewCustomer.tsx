
import OnboardingWizard from "@/components/Onboarding/OnboardingWizard";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewCustomer = () => {
  const navigate = useNavigate();

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/super-admin')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">New Customer Onboarding</h1>
        </div>
        
        <OnboardingWizard />
      </div>
    </SuperAdminLayout>
  );
};

export default NewCustomer;
