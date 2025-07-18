
import { useState } from "react";
import { MapPin, Layers, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import MapboxMap from "@/components/MapboxMap";

// Mock photo data with coordinates
const mockPhotoMarkers = [
  {
    id: "1",
    coordinates: [-122.4194, 37.7749] as [number, number],
    title: "Golden Gate Bridge",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
  },
  {
    id: "2",
    coordinates: [-122.4089, 37.7835] as [number, number],
    title: "Fisherman's Wharf",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop"
  },
  {
    id: "3",
    coordinates: [-122.4194, 37.7849] as [number, number],
    title: "Lombard Street",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop"
  }
];

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const handleLocationSelect = (coordinates: [number, number]) => {
    setSelectedLocation(coordinates);
    console.log('Selected location:', coordinates);
  };

  const filteredMarkers = mockPhotoMarkers.filter(marker =>
    marker.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-xl font-bold">Map</h1>
            <div className="ml-auto flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4" />
              </Button>
            </div>
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
          
          {/* Filters */}
          {showFilters && (
            <Card className="mt-3 p-3">
              <div className="text-sm text-muted-foreground mb-2">Quick Filters</div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">Recent</Button>
                <Button variant="outline" size="sm">Popular</Button>
                <Button variant="outline" size="sm">Nearby</Button>
                <Button variant="outline" size="sm">Friends</Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="pt-32 h-screen">
        <div className="w-full h-full">
          <MapboxMap 
            markers={filteredMarkers}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>

      {/* Photo count indicator */}
      <div className="absolute bottom-24 left-4 right-4 z-10">
        <Card className="p-3 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{filteredMarkers.length}</span>
              <span className="text-muted-foreground ml-1">
                photo{filteredMarkers.length !== 1 ? 's' : ''} visible
              </span>
            </div>
            {selectedLocation && (
              <div className="text-xs text-muted-foreground">
                Tap selected: {selectedLocation[1].toFixed(4)}, {selectedLocation[0].toFixed(4)}
              </div>
            )}
          </div>
        </Card>
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
