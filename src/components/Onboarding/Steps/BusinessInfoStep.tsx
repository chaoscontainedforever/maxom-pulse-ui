
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BusinessInfoStep = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [searchOption, setSearchOption] = useState("website");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setSearchCompleted(true);
      
      // Mock auto-fill data
      setBusinessName("Main Street Restaurant");
      setBusinessType("restaurant");
      setBusinessAddress("123 Main St, Anytown, CA 12345");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Find Your Business</h3>
        <p className="text-muted-foreground mb-4">
          We'll use this information to automatically set up your account with the correct details.
        </p>
        
        <RadioGroup 
          defaultValue={searchOption} 
          onValueChange={setSearchOption}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="website" id="website" />
            <label htmlFor="website" className="cursor-pointer">Website URL</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <label htmlFor="phone" className="cursor-pointer">Google Business Phone Number</label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          {searchOption === "website" ? (
            <div className="relative">
              <Input
                placeholder="e.g., www.yourbusiness.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="pr-20"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !websiteUrl}
                className="absolute right-0 top-0 rounded-l-none"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Input
                placeholder="e.g., (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pr-20"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !phoneNumber}
                className="absolute right-0 top-0 rounded-l-none"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium">Business Details</h3>
          {searchCompleted && (
            <div className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" /> Auto-filled
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="business-name" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Business Name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="business-type" className="text-sm font-medium">
                Business Type
              </label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="fitness">Fitness Studio</SelectItem>
                  <SelectItem value="auto">Auto Dealership</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="homeservices">Home Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Business Address
            </label>
            <Input
              id="address"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Street, City, State, ZIP"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Business Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="contact@yourbusiness.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-medium">
                Contact Phone
              </label>
              <Input
                id="contact-phone"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">
                Time Zone
              </label>
              <Select defaultValue="america-los_angeles">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
