
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

// Mock data
const mockPosts = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      username: "sarah_explores",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b95a1f8b?w=40&h=40&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    location: "Santorini, Greece",
    caption: "Perfect sunset at Oia! The colors were absolutely breathtaking 🌅",
    likes: 234,
    comments: 18,
    timeAgo: "2 hours ago",
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Feed</h1>
        </div>
      </div>

      {/* Posts */}
      <div className="pb-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="border-x-0 border-t-0 rounded-none">
            {/* Post header */}
            <div className="p-4 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.location}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Post image */}
            <div className="aspect-square">
              <img
                src={post.image}
                alt={post.location}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="font-semibold text-sm mb-1">{post.likes} likes</p>
              <p className="text-sm">
                <span className="font-semibold">{post.user.username}</span>{" "}
                {post.caption}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                View all {post.comments} comments
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                {post.timeAgo}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feed;
