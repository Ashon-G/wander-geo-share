
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: string;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    image: string;
    location: string;
    caption: string;
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard = ({ post, onLike, onBookmark, onComment, onShare }: PostCardProps) => {
  const [localLiked, setLocalLiked] = useState(post.isLiked || false);
  const [localBookmarked, setLocalBookmarked] = useState(post.isBookmarked || false);

  const handleLike = () => {
    setLocalLiked(!localLiked);
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    setLocalBookmarked(!localBookmarked);
    onBookmark?.(post.id);
  };

  return (
    <Card className="border-x-0 border-t-0 rounded-none">
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
              onClick={handleLike}
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${
                  localLiked ? 'fill-red-500 text-red-500' : ''
                }`} 
              />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onComment?.(post.id)}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onShare?.(post.id)}
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleBookmark}
          >
            <Bookmark 
              className={`h-5 w-5 transition-colors ${
                localBookmarked ? 'fill-current' : ''
              }`} 
            />
          </Button>
        </div>

        <p className="font-semibold text-sm mb-1">{post.likes} likes</p>
        <p className="text-sm">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
        {post.comments > 0 && (
          <p 
            className="text-xs text-muted-foreground mt-1 cursor-pointer hover:text-foreground"
            onClick={() => onComment?.(post.id)}
          >
            View all {post.comments} comments
          </p>
        )}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
          {post.timeAgo}
        </p>
      </div>
    </Card>
  );
};

export default PostCard;
