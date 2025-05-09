
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Speaker } from "lucide-react";

const VoiceConfig = () => {
  const [voiceType, setVoiceType] = useState("female-1");
  const [speechSpeed, setSpeechSpeed] = useState([1.0]);
  const [clarity, setClarity] = useState([0.8]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Voice Type</label>
            <Select value={voiceType} onValueChange={setVoiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female-1">Sophie (Female)</SelectItem>
                <SelectItem value="female-2">Emily (Female)</SelectItem>
                <SelectItem value="female-3">Madison (Female)</SelectItem>
                <SelectItem value="male-1">James (Male)</SelectItem>
                <SelectItem value="male-2">Michael (Male)</SelectItem>
                <SelectItem value="male-3">David (Male)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                Speech Speed: {speechSpeed[0].toFixed(1)}x
              </label>
            </div>
            <Slider
              value={speechSpeed}
              min={0.5}
              max={1.5}
              step={0.1}
              onValueChange={setSpeechSpeed}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slower</span>
              <span>Normal</span>
              <span>Faster</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                Clarity/Enunciation: {Math.round(clarity[0] * 100)}%
              </label>
            </div>
            <Slider
              value={clarity}
              min={0}
              max={1}
              step={0.05}
              onValueChange={setClarity}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Natural</span>
              <span>Balanced</span>
              <span>Very Clear</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Language</label>
            <Select defaultValue="en-US">
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="es-ES">Spanish</SelectItem>
                <SelectItem value="fr-FR">French</SelectItem>
                <SelectItem value="de-DE">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium">Voice Preview</h3>
            <p className="text-sm text-muted-foreground">
              Listen to how your voice assistant will sound with the current settings.
            </p>
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border">
                <h4 className="text-sm font-medium mb-2">Sample Greeting</h4>
                <p className="text-sm italic">
                  "Thank you for calling [Business Name]. This is our virtual assistant. How may I help you today?"
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  disabled={isPlaying}
                  onClick={handlePlay}
                >
                  {isPlaying ? (
                    <Speaker className="mr-2 h-4 w-4 animate-pulse" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Playing..." : "Play Sample"}
                </Button>
              </div>
              
              <div className="bg-background rounded-lg p-4 border">
                <h4 className="text-sm font-medium mb-2">Sample Response</h4>
                <p className="text-sm italic">
                  "I'd be happy to help you schedule an appointment. What day works best for you?"
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  disabled={isPlaying}
                  onClick={handlePlay}
                >
                  {isPlaying ? (
                    <Speaker className="mr-2 h-4 w-4 animate-pulse" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Playing..." : "Play Sample"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Pro Tip</h4>
            <p className="text-sm">
              A slightly slower speed with higher clarity works best for businesses 
              with complex information to convey, like medical offices or technical services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceConfig;
