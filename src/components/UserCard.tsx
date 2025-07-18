
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    location?: string;
    followers: number;
    isFollowing?: boolean;
  };
  onFollow?: (userId: string) => void;
}

const UserCard = ({ user, onFollow }: UserCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">@{user.username}</p>
          {user.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1 mt-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{user.followers} followers</span>
          </div>
        </div>
        
        <Button 
          variant={user.isFollowing ? "outline" : "default"}
          size="sm"
          onClick={() => onFollow?.(user.id)}
        >
          {user.isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
