
import { useState, useMemo } from "react";
import { Search, TrendingUp, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhotoCard from "@/components/PhotoCard";
import Filter from "@/components/Filter";

// Mock data with additional filter properties
const mockPhotos = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    location: "Santorini, Greece",
    distance: "2.3 km",
    distanceKm: 2.3,
    likes: 124,
    userName: "explorer_anna",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b95a1f8b?w=40&h=40&fit=crop&crop=face",
    category: "Architecture",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    location: "Swiss Alps",
    distance: "15.7 km",
    distanceKm: 15.7,
    likes: 89,
    userName: "mountain_mike",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    category: "Nature",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    location: "Tokyo Streets",
    distance: "8.2 km",
    distanceKm: 8.2,
    likes: 256,
    userName: "street_photographer",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    category: "Street",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=600&fit=crop",
    location: "Local Garden",
    distance: "1.5 km",
    distanceKm: 1.5,
    likes: 43,
    userName: "nature_lover",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    category: "Nature",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
];

interface FilterOptions {
  distance: number[];
  timeRange: string;
  categories: string[];
  minLikes: number[];
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");
  const [filters, setFilters] = useState<FilterOptions>({
    distance: [10],
    timeRange: "all",
    categories: [],
    minLikes: [0]
  });

  const categories = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "nearby", label: "Nearby", icon: MapPin },
    { id: "recent", label: "Recent" },
    { id: "popular", label: "Popular" },
  ];

  const filteredPhotos = useMemo(() => {
    let filtered = [...mockPhotos];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(photo =>
        photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Distance filter
    filtered = filtered.filter(photo => photo.distanceKm <= filters.distance[0]);

    // Categories filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(photo => filters.categories.includes(photo.category));
    }

    // Min likes filter
    filtered = filtered.filter(photo => photo.likes >= filters.minLikes[0]);

    // Time range filter
    if (filters.timeRange !== "all") {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.timeRange) {
        case "today":
          cutoff.setHours(0, 0, 0, 0);
          break;
        case "week":
          cutoff.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoff.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(photo => photo.timestamp >= cutoff);
    }

    // Category-based sorting
    switch (activeCategory) {
      case "trending":
        return filtered.sort((a, b) => b.likes - a.likes);
      case "nearby":
        return filtered.sort((a, b) => a.distanceKm - b.distanceKm);
      case "recent":
        return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case "popular":
        return filtered.sort((a, b) => b.likes - a.likes);
      default:
        return filtered;
    }
  }, [searchQuery, activeCategory, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

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
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeCategory === id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setActiveCategory(id)}
            >
              {Icon && <Icon className="h-4 w-4 mr-1" />}
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <p className="text-sm text-muted-foreground">
          {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Photo Grid */}
      <div className="p-4">
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos match your filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setFilters({
                  distance: [10],
                  timeRange: "all",
                  categories: [],
                  minLikes: [0]
                });
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
