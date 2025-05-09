
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface BusinessDay {
  id: string;
  day: string;
  enabled: boolean;
  hours: {
    open: string;
    close: string;
  };
}

const BusinessHours = () => {
  const [businessDays, setBusinessDays] = useState<BusinessDay[]>([
    { id: '1', day: 'Monday', enabled: true, hours: { open: '09:00', close: '17:00' } },
    { id: '2', day: 'Tuesday', enabled: true, hours: { open: '09:00', close: '17:00' } },
    { id: '3', day: 'Wednesday', enabled: true, hours: { open: '09:00', close: '17:00' } },
    { id: '4', day: 'Thursday', enabled: true, hours: { open: '09:00', close: '17:00' } },
    { id: '5', day: 'Friday', enabled: true, hours: { open: '09:00', close: '17:00' } },
    { id: '6', day: 'Saturday', enabled: false, hours: { open: '10:00', close: '15:00' } },
    { id: '7', day: 'Sunday', enabled: false, hours: { open: '10:00', close: '15:00' } }
  ]);
  
  const toggleDay = (id: string) => {
    setBusinessDays(businessDays.map(day => {
      if (day.id === id) {
        return { ...day, enabled: !day.enabled };
      }
      return day;
    }));
  };
  
  const updateHours = (id: string, field: 'open' | 'close', value: string) => {
    setBusinessDays(businessDays.map(day => {
      if (day.id === id) {
        return { ...day, hours: { ...day.hours, [field]: value } };
      }
      return day;
    }));
  };
  
  const handleApplyToAll = (currentId: string) => {
    const currentDay = businessDays.find(day => day.id === currentId);
    if (!currentDay) return;
    
    setBusinessDays(businessDays.map(day => {
      if (day.id !== currentId) {
        return { ...day, hours: { ...currentDay.hours } };
      }
      return day;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Regular Business Hours</h3>
        <p className="text-sm text-muted-foreground">
          Set the days and hours when your business is open. Your voice assistant will answer calls during these hours.
        </p>
        
        <div className="space-y-3">
          {businessDays.map((day) => (
            <div 
              key={day.id}
              className={`flex items-center justify-between p-3 rounded-md ${day.enabled ? 'bg-muted/30' : 'bg-muted/10'}`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id={`day-${day.id}`} 
                  checked={day.enabled}
                  onCheckedChange={() => toggleDay(day.id)}
                />
                <label
                  htmlFor={`day-${day.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${!day.enabled && 'text-muted-foreground'}`}
                >
                  {day.day}
                </label>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={day.hours.open}
                    onChange={(e) => updateHours(day.id, 'open', e.target.value)}
                    disabled={!day.enabled}
                    className="w-28"
                  />
                  <span className={`text-sm ${!day.enabled && 'text-muted-foreground'}`}>to</span>
                  <Input
                    type="time"
                    value={day.hours.close}
                    onChange={(e) => updateHours(day.id, 'close', e.target.value)}
                    disabled={!day.enabled}
                    className="w-28"
                  />
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  disabled={!day.enabled}
                  onClick={() => handleApplyToAll(day.id)}
                >
                  Apply to all
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Holiday Schedule</h3>
        <p className="text-sm text-muted-foreground">
          Add specific dates when your business is closed for holidays or special events.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100">
            <div className="flex items-center space-x-3">
              <div className="w-16">
                <Input
                  type="date"
                  defaultValue="2023-12-25"
                  className="text-xs"
                />
              </div>
              <span className="text-sm font-medium">Christmas Day</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="text-red-700 bg-red-100">Closed</Badge>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100">
            <div className="flex items-center space-x-3">
              <div className="w-16">
                <Input
                  type="date"
                  defaultValue="2024-01-01"
                  className="text-xs"
                />
              </div>
              <span className="text-sm font-medium">New Year's Day</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="text-red-700 bg-red-100">Closed</Badge>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <Button variant="outline" className="mt-2">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Holiday
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">After-Hours Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure how calls should be handled outside your business hours.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">After-Hours Behavior</label>
            <Select defaultValue="voicemail">
              <SelectTrigger>
                <SelectValue placeholder="Select behavior" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voicemail">Send to Voicemail</SelectItem>
                <SelectItem value="message">Play Custom Message</SelectItem>
                <SelectItem value="redirect">Redirect to Another Number</SelectItem>
                <SelectItem value="assistant">Keep AI Assistant Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Forward to Phone Number</label>
            <Input placeholder="(555) 123-4567" />
            <p className="text-xs text-muted-foreground">
              Optional. Calls will be forwarded to this number outside business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ className, children }) => (
  <div className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
    {children}
  </div>
);

export default BusinessHours;
