
import { useState } from "react";
import { ArrowLeft, Camera, Image, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const Create = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Create Post</h1>
          <Button variant="ghost" size="sm" disabled={!selectedImage}>
            Share
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Image selection */}
        <Card className="p-6">
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4">
              <div className="flex gap-4">
                <Button variant="outline" size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Camera
                </Button>
                <Button variant="outline" size="lg">
                  <Image className="h-5 w-5 mr-2" />
                  Gallery
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Take a photo or select from gallery
              </p>
            </div>
          )}
        </Card>

        {/* Caption */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Caption</label>
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Add location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location detection */}
        <Button variant="outline" className="w-full">
          <MapPin className="h-4 w-4 mr-2" />
          Use current location
        </Button>
      </div>
    </div>
  );
};

export default Create;
