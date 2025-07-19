
import { NavLink } from "react-router-dom";
import { Compass, MapPin, Home, Plus, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navItems = [
    { to: "/", icon: Compass, label: "Explore" },
    { to: "/map", icon: MapPin, label: "Map" },
    { to: "/feed", icon: Home, label: "Feed" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
    { to: "/create", icon: Plus, label: "Create" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-primary bg-primary/10"
              )
            }
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
