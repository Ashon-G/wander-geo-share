
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Expanded mock data with more posts
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
    caption: "Perfect sunset at Oia! The colors were absolutely breathtaking 🌅 #sunset #santorini #greece",
    likes: 234,
    comments: 18,
    timeAgo: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    user: {
      name: "Alex Thompson",
      username: "alex_wanderer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=400&fit=crop",
    location: "Yosemite National Park, CA",
    caption: "Early morning light filtering through the forest. Nature is the best artist! 🌲✨",
    likes: 156,
    comments: 12,
    timeAgo: "5 hours ago",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    user: {
      name: "Maria Garcia",
      username: "maria_photos",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop",
    location: "Malibu Beach, CA",
    caption: "Catching waves and good vibes 🌊 Perfect day at the beach!",
    likes: 89,
    comments: 7,
    timeAgo: "1 day ago",
    isLiked: false,
    isBookmarked: true,
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

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
        {posts.map((post) => (
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark 
                    className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} 
                  />
                </Button>
              </div>

              <p className="font-semibold text-sm mb-1">{post.likes} likes</p>
              <p className="text-sm">
                <span className="font-semibold">{post.user.username}</span>{" "}
                {post.caption}
              </p>
              {post.comments > 0 && (
                <p className="text-xs text-muted-foreground mt-1 cursor-pointer hover:text-foreground">
                  View all {post.comments} comments
                </p>
              )}
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
