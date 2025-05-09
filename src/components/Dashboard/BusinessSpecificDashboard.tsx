
import RestaurantDashboard from "@/components/Dashboard/BusinessTypes/RestaurantDashboard";
import FitnessDashboard from "@/components/Dashboard/BusinessTypes/FitnessDashboard";
import AutoDealershipDashboard from "@/components/Dashboard/BusinessTypes/AutoDealershipDashboard";
import HealthcareDashboard from "@/components/Dashboard/BusinessTypes/HealthcareDashboard";
import HomeServicesDashboard from "@/components/Dashboard/BusinessTypes/HomeServicesDashboard";

interface BusinessSpecificDashboardProps {
  businessType: string;
}

const BusinessSpecificDashboard = ({ businessType }: BusinessSpecificDashboardProps) => {
  switch (businessType) {
    case "restaurant":
      return <RestaurantDashboard />;
    case "fitness":
      return <FitnessDashboard />;
    case "auto":
      return <AutoDealershipDashboard />;
    case "healthcare":
      return <HealthcareDashboard />;
    case "homeservices":
      return <HomeServicesDashboard />;
    default:
      return (
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold">Unknown Business Type</h3>
          <p className="text-muted-foreground mt-2">
            We don't have a specific dashboard for this business type yet.
          </p>
        </div>
      );
  }
};

export default BusinessSpecificDashboard;
