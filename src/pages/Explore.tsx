
import { useState } from "react";
import { Search, Filter, Trending, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhotoCard from "@/components/PhotoCard";

// Mock data for now
const mockPhotos = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    location: "Santorini, Greece",
    distance: "2.3 km",
    likes: 124,
    userName: "explorer_anna",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b95a1f8b?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    location: "Swiss Alps",
    distance: "15.7 km",
    likes: 89,
    userName: "mountain_mike",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Explore</h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          <Button variant="default" size="sm" className="whitespace-nowrap">
            <Trending className="h-4 w-4 mr-1" />
            Trending
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <MapPin className="h-4 w-4 mr-1" />
            Nearby
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Recent
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Popular
          </Button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {mockPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
