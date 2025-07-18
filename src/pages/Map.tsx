
import { useState } from "react";
import { MapPin, Layers, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-xl font-bold">Map</h1>
            <Button variant="outline" size="sm" className="ml-auto">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="pt-32 h-screen">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Map integration coming soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              This will show photos plotted on an interactive map
            </p>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <Button 
        className="fixed bottom-20 right-4 rounded-full h-12 w-12 shadow-lg"
        size="icon"
      >
        <MapPin className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Map;
