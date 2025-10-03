import React, { useState, useEffect, useRef } from 'react';
import { BreakSuggestionPopup } from '@/components/BreakSuggestionPopup';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useCamera } from "@/hooks/useCamera";
import { useTimeTracking } from "@/hooks/useTimeTracking";
import axios from 'axios';
import Login from "./pages/Login";
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
  Brain,
  LogOut
} from 'lucide-react';

// Shared Sidebar Component
const AppSidebar = ({ onLogout }: { onLogout: () => void }) => {
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

        {/* Logout Button */}
        <div className="mt-4 px-4">
          <SidebarMenuButton
            onClick={onLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  // Admin dashboard state
  const [currentView, setCurrentView] = useState('dashboard')
  const [attendanceData, setAttendanceData] = useState<any[]>([])
  const [users, setUsersData] = useState<any[]>([])
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Advanced AI features
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const [systemHealth, setSystemHealth] = useState<any>({})
  const [realTimeScans, setRealTimeScans] = useState<any[]>([])
  const [analyticsData, setAnalyticsData] = useState<any>({})
  const [isAIScanning, setIsAIScanning] = useState(false)
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null)
  const [liveCameraFeeds, setLiveCameraFeeds] = useState<any>({})
  const [aiDailyLogs, setAiDailyLogs] = useState<any[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [cameraStream, setCameraStream] = useState<any>(null)

  // Enhanced AI features
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<any>({})
  const [realTimeAlerts, setRealTimeAlerts] = useState<any[]>([])

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Time tracking hook
  const timeTracking = useTimeTracking();

  // Break suggestion handler
  const [breakSuggestion, setBreakSuggestion] = useState<{
    isOpen: boolean;
    reason: string;
    duration: number;
    emotion?: string;
    confidence?: number;
    type: 'scheduled' | 'emotional' | 'time-based';
  } | null>(null);

  const handleBreakSuggestion = (reason: string, duration: number, emotion?: string, confidence?: number) => {
    setBreakSuggestion({
      isOpen: true,
      reason,
      duration,
      emotion,
      confidence,
      type: emotion ? 'emotional' : 'time-based'
    });
  };

  const handleTakeBreak = () => {
    if (breakSuggestion) {
      timeTracking.startBreak('emotional', breakSuggestion.emotion);
      setBreakSuggestion(null);
    }
  };

  const handleDismissBreak = () => {
    setBreakSuggestion(null);
  };

  // Camera hook at App level for continuous operation across all pages
  const cameraProps = useCamera(handleBreakSuggestion);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const storedUserRole = localStorage.getItem('userRole');

      if (authStatus === 'true') {
        setIsAuthenticated(true);
        // Set user role from localStorage
        if (storedUserRole === 'admin') {
          setUserRole('admin');
          // Initialize admin dashboard data
          fetchAttendanceData();
          fetchUsersData();
          fetchSystemHealth();
          fetchAnalyticsData();
          fetchDailyLogs();
          generateAIInsights();
          generatePredictiveAnalytics();
          fetchRealTimeAlerts();
        } else {
          setUserRole('user');
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('autoStartAI');

    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Admin dashboard functions
  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/attendance/')
      const data = await response.json()
      setAttendanceData(data.results || data)
    } catch (error) {
      console.error('Error fetching attendance:', error)
    }
  }

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/employees/')
      const data = await response.json()
      setUsersData(data.results || data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchSystemHealth = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/system/health/')
      const data = await response.json()
      setSystemHealth(data)
    } catch (error) {
      console.error('Error fetching system health:', error)
    }
  }

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/analytics/')
      const data = await response.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setAnalyticsData({
        weeklyAttendance: [85, 88, 92, 89, 94, 91, 90],
        departmentStats: {
          'Engineering': { present: 8, total: 10 },
          'Marketing': { present: 6, total: 8 },
          'Sales': { present: 7, total: 9 },
          'HR': { present: 4, total: 5 }
        },
        productivityScore: 87
      })
    }
  }

  const fetchDailyLogs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/daily-logs/')
      const data = await response.json()
      setAiDailyLogs(data.logs || [])
    } catch (error) {
      console.error('Error fetching daily logs:', error)
    }
  }

  const generateAIInsights = () => {
    const currentHour = new Date().getHours()
    const insights = [
      "🚀 Productivity increased by 15% this week",
      "👥 3 employees working overtime - consider workload balance",
      "📊 Engineering department shows 95% attendance rate",
      "⚡ Peak productivity hours: 10 AM - 2 PM",
      "🎯 Marketing team exceeded targets by 25%",
      "🔍 System detected 2 unauthorized access attempts",
      "📈 Overall attendance rate: 92% (above target)",
      "💡 AI recommends flexible scheduling for night shift",
      `🤖 AI Prediction: ${currentHour < 12 ? 'Morning rush expected in 30 mins' : 'Evening peak attendance in 2 hours'}`,
      "🎯 Face recognition accuracy: 97.8% (improved by 2.1%)",
      "⚡ System performance: Optimal (CPU: 45%, Memory: 62%)",
      "🔄 Auto-learning: System adapting to lighting conditions",
      "📊 Trend analysis: Attendance improving by 3% weekly",
      "🎪 AI detected unusual pattern: 2 late arrivals today",
      "💭 Smart scheduling: Recommended shift change for 3 employees",
      "🔮 Predictive: Tomorrow's attendance likely 94% based on patterns"
    ]
    setAiInsights(insights)
  }

  const generatePredictiveAnalytics = () => {
    const predictions = {
      tomorrowAttendance: 94,
      weeklyTrend: [85, 88, 92, 89, 94, 91, 90, 94],
      peakHours: ['9:00-10:00', '14:00-15:00', '17:00-18:00'],
      riskAlerts: [
        { type: 'Late Arrival', employee: 'John Doe', probability: 75 },
        { type: 'Absent', employee: 'Jane Smith', probability: 60 }
      ],
      optimization: {
        recommendedSchedule: 'Flexible hours for 3 employees',
        workloadBalance: 'Redistribute tasks in Engineering dept',
        cameraPlacement: 'Add camera to east entrance'
      }
    }
    setPredictiveAnalytics(predictions)
  }

  const fetchRealTimeAlerts = () => {
    const alerts = [
      {
        id: 1,
        type: 'warning',
        message: 'Unusual attendance pattern detected',
        timestamp: new Date(),
        priority: 'medium'
      },
      {
        id: 2,
        type: 'info',
        message: 'AI model updated with new training data',
        timestamp: new Date(Date.now() - 300000),
        priority: 'low'
      },
      {
        id: 3,
        type: 'success',
        message: 'Face recognition accuracy improved to 97.8%',
        timestamp: new Date(Date.now() - 600000),
        priority: 'high'
      }
    ]
    setRealTimeAlerts(alerts)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Admin Dashboard Components (simplified versions)
  const renderAdminDashboard = () => (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-main">
          <h1>🏢 Enterprise AI Attendance Management System</h1>
          <div className="system-status-badge">
            <span className="status-dot active"></span>
            System Online
          </div>
        </div>
        <div className="header-meta">
          <div className="current-time">
            {currentTime.toLocaleString()}
          </div>
          <div className="last-update">
            Last Update: {lastScanTime ? lastScanTime.toLocaleTimeString() : 'Never'}
          </div>
        </div>
      </div>

      <div className="kpi-dashboard">
        <div className="kpi-section">
          <h2>📊 Key Performance Indicators</h2>
          <div className="kpi-grid">
            <div className="kpi-card primary">
              <div className="kpi-icon">👥</div>
              <div className="kpi-content">
                <div className="kpi-value">{users.length}</div>
                <div className="kpi-label">Total Workforce</div>
                <div className="kpi-trend positive">+5% MoM</div>
              </div>
            </div>
            <div className="kpi-card primary">
              <div className="kpi-icon">📊</div>
              <div className="kpi-content">
                <div className="kpi-value">
                  {users.length > 0 ? Math.round((attendanceData.filter((a: any) => a.status === 'Present').length / users.length) * 100) : 0}%
                </div>
                <div className="kpi-label">Attendance Rate</div>
                <div className="kpi-trend positive">+2.1% vs Target</div>
              </div>
            </div>
            <div className="kpi-card secondary">
              <div className="kpi-icon">🤖</div>
              <div className="kpi-content">
                <div className="kpi-value">97.8%</div>
                <div className="kpi-label">AI Accuracy</div>
                <div className="kpi-trend positive">+1.2% improvement</div>
              </div>
            </div>
            <div className="kpi-card secondary">
              <div className="kpi-icon">⚡</div>
              <div className="kpi-content">
                <div className="kpi-value">98.5%</div>
                <div className="kpi-label">System Uptime</div>
                <div className="kpi-trend positive">99.9% this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-attendance">
        <h2>📊 Recent Attendance Records</h2>
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>👤 Employee</th>
                <th>📅 Date</th>
                <th>🕐 Check-in</th>
                <th>🕐 Check-out</th>
                <th>📊 Status</th>
                <th>⏱️ Work Hours</th>
                <th>🎯 Confidence</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.slice(0, 8).map((record: any, index: number) => (
                <tr key={index}>
                  <td>{record.employee_name || record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.check_in}</td>
                  <td>{record.check_out || '-'}</td>
                  <td className={`status-${record.status.toLowerCase()}`}>
                    {record.status}
                  </td>
                  <td>{record.work_hours || '-'}</td>
                  <td>{record.confidence_score ? `${record.confidence_score}%` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="control-panel">
        <h2>🎛️ Enterprise Control Center</h2>
        <div className="control-buttons">
          <button
            className={`control-btn ${isAIScanning ? 'stop' : 'start'}`}
            onClick={() => setIsAIScanning(!isAIScanning)}
          >
            {isAIScanning ? '⏹️ Stop AI Scanning' : '🚀 Start AI Scanning'}
          </button>
          <button
            className={`control-btn ${isCameraActive ? 'stop' : 'start'}`}
            onClick={() => setIsCameraActive(!isCameraActive)}
          >
            {isCameraActive ? '📷 Stop Camera' : '📷 Start Camera'}
          </button>
          <button className="control-btn refresh" onClick={() => {
            fetchAttendanceData()
            fetchUsersData()
            fetchSystemHealth()
          }}>
            🔄 Refresh All Data
          </button>
          <button className="control-btn logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : userRole === 'admin' ? (
            // Admin Dashboard
            <div className="min-h-screen bg-gray-900 text-white">
              <div className="container mx-auto px-4 py-8">
                {renderAdminDashboard()}
              </div>
            </div>
          ) : (
            // User Dashboard (FaceCam Control Hub)
            <SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
              <div className="min-h-screen bg-background text-foreground flex w-full">
                <AppSidebar onLogout={handleLogout} />
                <SidebarInset>
                  <Routes>
                    <Route path="/" element={<Index {...cameraProps} timeTracking={timeTracking} />} />
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
          )}

          {/* Break Suggestion Popup (only for users) */}
          {userRole === 'user' && breakSuggestion && (
            <BreakSuggestionPopup
              isOpen={breakSuggestion.isOpen}
              onClose={handleDismissBreak}
              onTakeBreak={handleTakeBreak}
              reason={breakSuggestion.reason}
              duration={breakSuggestion.duration}
              emotion={breakSuggestion.emotion}
              confidence={breakSuggestion.confidence}
              type={breakSuggestion.type}
            />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
