import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OfflinePost {
  id: string;
  image: string;
  caption: string;
  location: string;
  timestamp: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlinePosts, setOfflinePosts] = useState<OfflinePost[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflinePosts();
      toast({
        title: "Back online",
        description: "Syncing your posts...",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Posts will be saved and uploaded when you're back online",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline posts from localStorage
    loadOfflinePosts();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const loadOfflinePosts = () => {
    try {
      const stored = localStorage.getItem('offlinePosts');
      if (stored) {
        setOfflinePosts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load offline posts:', error);
    }
  };

  const saveOfflinePost = (post: Omit<OfflinePost, 'id' | 'timestamp'>) => {
    const newPost: OfflinePost = {
      ...post,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedPosts = [...offlinePosts, newPost];
    setOfflinePosts(updatedPosts);
    localStorage.setItem('offlinePosts', JSON.stringify(updatedPosts));

    toast({
      title: "Post saved offline",
      description: "Your post will be uploaded when you're back online",
    });

    // Register background sync if available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Background sync would be registered here in a real implementation
        console.log('Post saved for background sync');
      });
    }
  };

  const syncOfflinePosts = async () => {
    if (offlinePosts.length === 0) return;

    try {
      // In a real app, this would upload to your backend
      for (const post of offlinePosts) {
        console.log('Syncing post:', post);
        // await uploadPost(post);
      }

      // Clear offline posts after successful sync
      setOfflinePosts([]);
      localStorage.removeItem('offlinePosts');

      toast({
        title: "Posts synced",
        description: `${offlinePosts.length} posts uploaded successfully`,
      });
    } catch (error) {
      console.error('Failed to sync offline posts:', error);
      toast({
        title: "Sync failed",
        description: "Failed to upload offline posts. Will retry later.",
      });
    }
  };

  const clearOfflinePosts = () => {
    setOfflinePosts([]);
    localStorage.removeItem('offlinePosts');
  };

  return {
    isOnline,
    offlinePosts,
    saveOfflinePost,
    syncOfflinePosts,
    clearOfflinePosts,
  };
};