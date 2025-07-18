
import { Settings, Grid, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Alex Thompson",
    username: "alex_wanderer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "📍 Travel photographer | 🌍 Exploring the world one photo at a time",
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
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{user.username}</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Profile info */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-3">{user.bio}</p>
            
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold">{user.stats.posts}</div>
                <div className="text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.stats.followers}</div>
                <div className="text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.stats.following}</div>
                <div className="text-muted-foreground">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
          <Button variant="outline" className="flex-1">
            Share Profile
          </Button>
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
                <div key={index} className="aspect-square">
                  <img
                    src={image}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Map view coming soon</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="liked" className="mt-4">
            <div className="text-center py-8">
              <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No liked posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
