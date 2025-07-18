
import { useState, useRef } from "react";
import { ArrowLeft, Camera, Image, MapPin, X, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    toast({
      title: "Camera",
      description: "Camera functionality would open here",
    });
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          toast({
            title: "Location detected",
            description: "Current location added to your post",
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location error",
            description: "Unable to detect current location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to share",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Post shared!",
        description: "Your photo has been shared successfully",
      });
      
      // Reset form
      setSelectedImage(null);
      setCaption("");
      setLocation("");
      
      // Navigate back to feed
      navigate("/feed");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Create Post</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={!selectedImage || isUploading}
            onClick={handleShare}
          >
            {isUploading ? "Sharing..." : "Share"}
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
                <Button variant="outline" size="lg" onClick={handleCameraCapture}>
                  <Camera className="h-5 w-5 mr-2" />
                  Camera
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5 mr-2" />
                  Gallery
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Take a photo or select from gallery
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          )}
        </Card>

        {/* Caption */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Caption</label>
          <Textarea
            placeholder="Write a caption... Use #hashtags to help others discover your post!"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">
            {caption.length}/500
          </p>
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
        <Button variant="outline" className="w-full" onClick={handleCurrentLocation}>
          <MapPin className="h-4 w-4 mr-2" />
          Use current location
        </Button>

        {/* Additional options */}
        {selectedImage && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-medium">Photo Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Size:</span> Ready to upload
              </div>
              <div>
                <span className="font-medium">Quality:</span> High
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
