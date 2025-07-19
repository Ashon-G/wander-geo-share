
import { useLocation } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideNavigation = location.pathname === "/create";

  return (
    <div className="min-h-screen bg-background flex flex-col touch-pan-y">
      <main className="flex-1 pb-16 safe-area-inset">
        {children}
      </main>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default Layout;
