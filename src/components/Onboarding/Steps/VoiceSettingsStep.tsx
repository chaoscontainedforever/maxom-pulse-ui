
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Speaker } from "lucide-react";

const VoiceSettingsStep = () => {
  const [voiceType, setVoiceType] = useState("female-1");
  const [speechSpeed, setSpeechSpeed] = useState([1.0]);
  const [greeting, setGreeting] = useState(
    "Thank you for calling [Business Name]. This is our virtual assistant. How may I help you today?"
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Voice Configuration</h3>
        <p className="text-muted-foreground mb-4">
          Customize how your AI voice assistant sounds when answering calls.
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Voice Type</label>
              <Select value={voiceType} onValueChange={setVoiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female-1">Female Voice 1</SelectItem>
                  <SelectItem value="female-2">Female Voice 2</SelectItem>
                  <SelectItem value="male-1">Male Voice 1</SelectItem>
                  <SelectItem value="male-2">Male Voice 2</SelectItem>
                </SelectContent>
              </Select>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isPlaying}
                  onClick={handlePlay}
                >
                  {isPlaying ? (
                    <Speaker className="mr-2 h-4 w-4 animate-pulse" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Playing Sample..." : "Play Sample"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Speech Speed: {speechSpeed[0].toFixed(1)}x
              </label>
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
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Custom Greeting</label>
            <Textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Enter your custom greeting message"
              rows={3}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use [Business Name] as a placeholder for your business name.
            </p>

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handlePlay}
                disabled={isPlaying}
              >
                {isPlaying ? "Playing..." : "Preview Greeting"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hours of Operation</h3>
        <p className="text-muted-foreground mb-4">
          Set when your virtual assistant should answer calls.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox id="monday" defaultChecked />
              <label
                htmlFor="monday"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Monday
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-2 items-center">
                <Input
                  type="time"
                  defaultValue="09:00"
                  className="w-24"
                />
                <span className="text-sm">to</span>
                <Input
                  type="time"
                  defaultValue="17:00"
                  className="w-24"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox id="tuesday" defaultChecked />
              <label
                htmlFor="tuesday"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tuesday
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-2 items-center">
                <Input
                  type="time"
                  defaultValue="09:00"
                  className="w-24"
                />
                <span className="text-sm">to</span>
                <Input
                  type="time"
                  defaultValue="17:00"
                  className="w-24"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox id="wednesday" defaultChecked />
              <label
                htmlFor="wednesday"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wednesday
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-2 items-center">
                <Input
                  type="time"
                  defaultValue="09:00"
                  className="w-24"
                />
                <span className="text-sm">to</span>
                <Input
                  type="time"
                  defaultValue="17:00"
                  className="w-24"
                />
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            + Add More Days
          </Button>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">After-Hours Settings</h4>
          <Select defaultValue="voicemail">
            <SelectTrigger>
              <SelectValue placeholder="Select after-hours behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voicemail">Send to Voicemail</SelectItem>
              <SelectItem value="message">Play Custom Message</SelectItem>
              <SelectItem value="redirect">Redirect to Another Number</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettingsStep;
