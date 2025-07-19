
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import InstallPrompt from "./components/InstallPrompt";
import Explore from "./pages/Explore";
import Map from "./pages/Map";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/map" element={<Map />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<Create />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InstallPrompt />
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
