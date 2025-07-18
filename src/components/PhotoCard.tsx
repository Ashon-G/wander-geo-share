
import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Photo {
  id: string;
  imageUrl: string;
  location: string;
  distance: string;
  likes: number;
  userName: string;
  userAvatar: string;
}

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <div className="relative aspect-[3/4]">
        <img
          src={photo.imageUrl}
          alt={photo.location}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Location overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <div className="flex items-center text-sm mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="font-medium">{photo.location}</span>
          </div>
          <div className="text-xs opacity-80">{photo.distance} away</div>
        </div>

        {/* Like button */}
        <div className="absolute top-2 right-2">
          <div className="bg-black/20 backdrop-blur-sm rounded-full p-1.5">
            <Heart className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={photo.userAvatar} />
            <AvatarFallback>{photo.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{photo.userName}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Heart className="h-3 w-3" />
          <span className="text-xs">{photo.likes}</span>
        </div>
      </div>
    </Card>
  );
};

export default PhotoCard;
