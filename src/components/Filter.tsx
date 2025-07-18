
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { MapPin, Clock, Heart, Filter as FilterIcon } from "lucide-react";

interface FilterOptions {
  distance: number[];
  timeRange: string;
  categories: string[];
  minLikes: number[];
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [distance, setDistance] = useState([10]);
  const [timeRange, setTimeRange] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [minLikes, setMinLikes] = useState([0]);

  const categoryOptions = [
    "Nature",
    "Architecture", 
    "Street",
    "Food",
    "Portrait",
    "Landscape"
  ];

  const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked 
      ? [...categories, category]
      : categories.filter(c => c !== category);
    setCategories(updated);
  };

  const applyFilters = () => {
    onFilterChange({
      distance,
      timeRange,
      categories,
      minLikes
    });
  };

  const clearFilters = () => {
    setDistance([10]);
    setTimeRange("all");
    setCategories([]);
    setMinLikes([0]);
    onFilterChange({
      distance: [10],
      timeRange: "all", 
      categories: [],
      minLikes: [0]
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Photos</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-6">
          {/* Distance Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Distance: {distance[0]} km</label>
            </div>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Time Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Time Range</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={timeRange === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Categories</label>
            <div className="grid grid-cols-2 gap-3">
              {categoryOptions.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Min Likes Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Min Likes: {minLikes[0]}</label>
            </div>
            <Slider
              value={minLikes}
              onValueChange={setMinLikes}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button onClick={clearFilters} variant="outline" className="flex-1">
              Clear All
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Filter;
