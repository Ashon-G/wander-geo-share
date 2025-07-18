
import { Settings, Grid, MapPin, Heart, Users, Edit, Share2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock user data with more details
  const user = {
    name: "Alex Thompson",
    username: "alex_wanderer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "📍 Travel photographer | 🌍 Exploring the world one photo at a time | 📸 Available for collaborations",
    website: "alexwanderer.com",
    stats: {
      posts: 127,
      followers: 1840,
      following: 312,
    },
  };

  const mockPosts = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
  ];

  const mockLikedPosts = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop",
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are now ${isFollowing ? "not following" : "following"} ${user.name}`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Profile shared",
      description: "Profile link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{user.username}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Profile info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
              variant="secondary"
            >
              <Camera className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-2">{user.bio}</p>
            {user.website && (
              <p className="text-sm text-primary cursor-pointer hover:underline mb-3">
                {user.website}
              </p>
            )}
            
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="text-center cursor-pointer hover:bg-muted/50 p-1 rounded">
                <div className="font-bold">{user.stats.posts}</div>
                <div className="text-muted-foreground">Posts</div>
              </div>
              <div className="text-center cursor-pointer hover:bg-muted/50 p-1 rounded">
                <div className="font-bold">{user.stats.followers}</div>
                <div className="text-muted-foreground">Followers</div>
              </div>
              <div className="text-center cursor-pointer hover:bg-muted/50 p-1 rounded">
                <div className="font-bold">{user.stats.following}</div>
                <div className="text-muted-foreground">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          <Button variant="outline" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button 
            variant={isFollowing ? "outline" : "default"} 
            className="flex-1"
            onClick={handleFollow}
          >
            <Users className="h-4 w-4 mr-2" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Highlights/Stories row */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <div className="flex flex-col items-center gap-2 min-w-16">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
              <span className="text-2xl">+</span>
            </div>
            <span className="text-xs text-muted-foreground">New</span>
          </div>
          {/* Add more story highlights here */}
        </div>

        {/* Content tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-1">
              <Grid className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Liked
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map((image, index) => (
                <div key={index} className="aspect-square relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 100) + 10}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <Card className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Map view coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  See all your photos on a map
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="liked" className="mt-4">
            {mockLikedPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {mockLikedPosts.map((image, index) => (
                  <div key={index} className="aspect-square relative group cursor-pointer">
                    <img
                      src={image}
                      alt={`Liked post ${index + 1}`}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    <div className="absolute top-2 right-2">
                      <Heart className="h-4 w-4 text-white fill-red-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No liked posts yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Posts you like will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
