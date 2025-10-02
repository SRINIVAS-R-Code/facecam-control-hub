import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import FaceDetection from "./pages/FaceDetection";
import Recording from "./pages/Recording";
import Analytics from "./pages/Analytics";
import AIChatPage from "./pages/AIChatPage";
import SentimentAnalysisPage from "./pages/SentimentAnalysisPage";
import SystemHealth from "./pages/SystemHealth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import {
  Cpu,
  Shield,
  Zap,
  Eye,
  Camera,
  Bot,
  Video,
  MessageSquare,
  BarChart3,
  Brain
} from 'lucide-react';

// Shared Sidebar Component
const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-semibold">Face Control Hub</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/'}>
              <Link to="/">
                <Camera className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/face-detection'}>
              <Link to="/face-detection">
                <Eye className="w-4 h-4" />
                <span>Face Detection</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/recording'}>
              <Link to="/recording">
                <Video className="w-4 h-4" />
                <span>Recording</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/analytics'}>
              <Link to="/analytics">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/ai-chat'}>
              <Link to="/ai-chat">
                <MessageSquare className="w-4 h-4" />
                <span>AI Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/sentiment-analysis'}>
              <Link to="/sentiment-analysis">
                <Brain className="w-4 h-4" />
                <span>Sentiment Analysis</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/system-health'}>
              <Link to="/system-health">
                <Shield className="w-4 h-4" />
                <span>System Health</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/settings'}>
              <Link to="/settings">
                <Cpu className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
          <div className="min-h-screen bg-background text-foreground flex w-full">
            <AppSidebar />
            <SidebarInset>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/face-detection" element={<FaceDetection />} />
                <Route path="/recording" element={<Recording />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/ai-chat" element={<AIChatPage />} />
                <Route path="/sentiment-analysis" element={<SentimentAnalysisPage />} />
                <Route path="/system-health" element={<SystemHealth />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
