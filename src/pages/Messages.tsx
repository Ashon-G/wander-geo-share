import { useState } from "react";
import { ArrowLeft, Search, Plus, Phone, Video, MoreHorizontal, Send, Smile, Image, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image';
  imageUrl?: string;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      username: "sarah_explores",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b95a1f8b?w=40&h=40&fit=crop&crop=face",
      isOnline: true,
    },
    lastMessage: "That sunset photo is amazing! 🌅",
    timestamp: "2m",
    unreadCount: 2,
    messages: [
      { id: "1", text: "Hey! I saw your latest post from Santorini", timestamp: "10:30", isOwn: false, type: 'text' },
      { id: "2", text: "Thank you! It was absolutely breathtaking", timestamp: "10:32", isOwn: true, type: 'text' },
      { id: "3", text: "That sunset photo is amazing! 🌅", timestamp: "10:35", isOwn: false, type: 'text' },
    ],
  },
  {
    id: "2",
    user: {
      name: "Alex Thompson",
      username: "alex_wanderer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      isOnline: false,
    },
    lastMessage: "You: Let's plan our next adventure!",
    timestamp: "1h",
    unreadCount: 0,
    messages: [
      { id: "1", text: "Your Yosemite photos are incredible!", timestamp: "09:15", isOwn: false, type: 'text' },
      { id: "2", text: "Thanks! The lighting was perfect that morning", timestamp: "09:20", isOwn: true, type: 'text' },
      { id: "3", text: "Let's plan our next adventure!", timestamp: "09:22", isOwn: true, type: 'text' },
    ],
  },
  {
    id: "3",
    user: {
      name: "Maria Garcia",
      username: "maria_photos",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face",
      isOnline: true,
    },
    lastMessage: "Beach vibes! 🌊",
    timestamp: "3h",
    unreadCount: 1,
    messages: [
      { id: "1", text: "Love your Malibu shots!", timestamp: "08:45", isOwn: false, type: 'text' },
      { id: "2", text: "Beach vibes! 🌊", timestamp: "08:50", isOwn: false, type: 'text' },
    ],
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text',
    };

    // In a real app, this would send to the backend
    setNewMessage("");
    toast({
      title: "Message sent",
      description: `Message sent to ${selectedConversation.user.name}`,
    });
  };

  const handleCall = (type: 'voice' | 'video') => {
    toast({
      title: `${type === 'voice' ? 'Voice' : 'Video'} call`,
      description: `Starting ${type} call with ${selectedConversation?.user.name}...`,
    });
  };

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Chat Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <div className="p-4 flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedConversation(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.user.avatar} />
              <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="font-semibold">{selectedConversation.user.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedConversation.user.isOnline ? "Active now" : "Last seen recently"}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleCall('voice')}>
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCall('video')}>
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {selectedConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isOwn
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="mb-1">
              <Image className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-10"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            
            {newMessage.trim() ? (
              <Button size="icon" onClick={handleSendMessage} className="mb-1">
                <Send className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="mb-1">
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Conversations */}
      <div className="pb-4">
        {filteredConversations.map((conversation) => (
          <Card 
            key={conversation.id} 
            className="border-x-0 border-t-0 rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="p-4 flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              
              {conversation.unreadCount > 0 && (
                <div className="bg-primary text-primary-foreground rounded-full min-w-5 h-5 flex items-center justify-center">
                  <span className="text-xs font-medium px-1">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;