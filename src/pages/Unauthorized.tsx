
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6 mb-6">
        <Shield className="h-16 w-16 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        You don't have permission to access this page. Please contact your administrator if you think this is an error.
      </p>
      <div className="space-x-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
        <Button onClick={() => navigate("/admin")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
