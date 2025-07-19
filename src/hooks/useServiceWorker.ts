import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useServiceWorker = () => {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
            
            // Update available
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      toast({
                        title: "App Updated",
                        description: "New version available! Refresh to update.",
                      });
                    }
                  }
                });
              }
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, [toast]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "You'll receive notifications for new messages",
        });
      }
    }
  };

  const installPrompt = () => {
    let deferredPrompt: any;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      toast({
        title: "Install App",
        description: "Add WanderGeo to your home screen for a better experience",
        action: undefined,
      });
    });
  };

  return {
    requestNotificationPermission,
    installPrompt,
  };
};