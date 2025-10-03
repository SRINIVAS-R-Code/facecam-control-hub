import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CameraDisplay } from '@/components/CameraDisplay';
import { ControlPanel } from '@/components/ControlPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AIChat } from '@/components/AIChat';
import { BreakSuggestionPopup } from '@/components/BreakSuggestionPopup';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  HardDrive,
  Wifi,
  Calendar,
  FileText,
  Users,
  Target,
  Award,
  Settings,
  Database,
  Server,
  Monitor,
  CheckCircle,
  XCircle,
  Timer,
  Gauge,
  Layers,
  Building,
  Factory,
  Briefcase,
  UserCheck,
  AlertCircle,
  TrendingDown,
  DollarSign,
  Percent,
  Play,
  Square,
  RefreshCw,
  VideoOff,
  Trash2
} from 'lucide-react';

const Index = ({
  isActive,
  isPaused,
  isLoading,
  facesDetected,
  isRecording,
  error,
  videoRef,
  canvasRef,
  startCamera,
  stopCamera,
  pauseCamera,
  resumeCamera,
  resetSystem,
  startRecording,
  stopRecording,
  captureSnapshot,
  clearErrors,
  getStats,
  facialLandmarks,
  modelsLoading,
  timeTracking
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Break suggestion state
  const [breakSuggestion, setBreakSuggestion] = useState<{
    isOpen: boolean;
    reason: string;
    duration: number;
    emotion?: string;
    confidence?: number;
    type: 'scheduled' | 'emotional' | 'time-based';
  } | null>(null);

  const stats = getStats();

  // Mock data for professional dashboard
  const [dashboardData, setDashboardData] = useState({
    performanceData: [
      { time: '00:00', fps: 28, accuracy: 94, detections: 12 },
      { time: '04:00', fps: 29, accuracy: 95, detections: 18 },
      { time: '08:00', fps: 27, accuracy: 93, detections: 45 },
      { time: '12:00', fps: 30, accuracy: 96, detections: 67 },
      { time: '16:00', fps: 28, accuracy: 94, detections: 52 },
      { time: '20:00', fps: 26, accuracy: 92, detections: 23 },
    ],
    emotionData: [
      { name: 'Happy', value: 45, color: '#10B981' },
      { name: 'Neutral', value: 30, color: '#6B7280' },
      { name: 'Sad', value: 15, color: '#3B82F6' },
      { name: 'Angry', value: 8, color: '#EF4444' },
      { name: 'Surprised', value: 2, color: '#F59E0B' },
    ],
    systemMetrics: {
      uptime: 99.7,
      cpuUsage: 45,
      memoryUsage: 67,
      networkLatency: 12,
      storageUsed: 2.3,
      totalStorage: 10,
    },
    kpis: {
      totalDetections: 1247,
      avgAccuracy: 94.2,
      activeCameras: 1,
      processingRate: 28.5,
      alertsToday: 3,
      uptimeHours: 24,
    }
  });

  // Update dashboard data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        kpis: {
          ...prev.kpis,
          totalDetections: prev.kpis.totalDetections + Math.floor(Math.random() * 5),
          avgAccuracy: 94 + Math.random() * 2,
          processingRate: 28 + Math.random() * 2,
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Break suggestion handler
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

  // Handle taking a break
  const handleTakeBreak = () => {
    if (breakSuggestion) {
      timeTracking.startBreak('emotional', breakSuggestion.emotion);
      setBreakSuggestion(null);
    }
  };

  // Handle dismissing break suggestion
  const handleDismissBreak = () => {
    setBreakSuggestion(null);
  };

  // Auto-start AI Detection Control after login
  React.useEffect(() => {
    const autoStartAI = localStorage.getItem('autoStartAI');
    if (autoStartAI === 'true' && !isActive) {
      console.log('🚀 Auto-starting AI Detection Control after login...');
      localStorage.removeItem('autoStartAI'); // Clear the flag

      // Trigger AI Detection Control automatically
      const triggerAI = async () => {
        if (error) clearErrors();

        if (!isActive) {
          console.log('📹 Starting camera...');
          await startCamera();
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        if (!isRecording && isActive) {
          console.log('🎥 Starting recording...');
          startRecording();
        }

        console.log('✅ AI Detection Control activated successfully!');
      };

      triggerAI();
    }
  }, [isActive, isRecording, error, clearErrors, startCamera, startRecording, navigate]);

  return (
    <>
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl sticky top-0 z-10 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 backdrop-blur-sm shadow-xl">
                <Bot className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-sm">
                  FaceCam Control Hub
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  Enterprise Face Detection & AI Management System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-semibold text-white">LIVE</span>
              </div>

              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`font-bold text-sm px-4 py-2 shadow-lg backdrop-blur-sm border-white/20 ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-green-400/50 shadow-green-500/25"
                    : "bg-white/10 text-slate-300 border-white/20"
                }`}
              >
                <Cpu className="w-4 h-4 mr-2" />
                {isActive ? 'SYSTEM ACTIVE' : 'SYSTEM OFFLINE'}
              </Badge>

              {facesDetected > 0 && (
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/40 text-blue-100 font-bold px-4 py-2 shadow-lg backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4 mr-2 drop-shadow-sm" />
                  {facesDetected} Detected
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 min-h-screen">
        {/* AI Detection Control - Primary Feature */}
        <div className="mb-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 hover:border-primary/50 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">
                      AI Detection Control
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Intelligent automation for complete dashboard management
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                        <Activity className="w-3 h-3 mr-1" />
                        Active Learning
                      </Badge>
                      <Badge variant="outline">
                        <Zap className="w-3 h-3 mr-1" />
                        Auto-Optimize
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
                    onClick={async () => {
                      // AI Detection: Single click to activate entire dashboard
                      try {
                        console.log('🚀 AI Detection Control activated');

                        // Clear any existing errors first
                        if (error) {
                          clearErrors();
                        }

                        // Start camera if not active
                        if (!isActive) {
                          console.log('📹 Starting camera...');
                          await startCamera();
                          // Wait for camera to fully initialize
                          await new Promise(resolve => setTimeout(resolve, 2000));
                          console.log('✅ Camera started successfully');
                        }

                        // Start recording if not recording and camera is active
                        if (!isRecording && isActive) {
                          console.log('🎥 Starting recording...');
                          startRecording();
                          console.log('✅ Recording started');
                        }

                        // Keep camera and recording active - no auto-navigation
                        console.log('✅ AI Detection Control activated successfully!');
                        console.log('📹 Camera and recording are now active');
                        console.log('🎯 You can now navigate manually to other sections');

                      } catch (err) {
                        console.error('❌ AI Detection failed:', err);
                        // Clear any errors that occurred
                        clearErrors();
                      }
                    }}
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Smart Detect & Control
                  </Button>
                  <p className="text-xs text-muted-foreground text-right">
                    One-click intelligent dashboard management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quick Access Cards */}
          <Card
            className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-white/10 hover:border-blue-400/50 bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 backdrop-blur-xl cursor-pointer shadow-xl hover:shadow-blue-500/25"
            onClick={async () => {
              // Trigger AI Detection Control and navigate
              console.log('🚀 Live Camera clicked - Starting AI Detection...');

              if (error) clearErrors();

              if (!isActive) {
                console.log('📹 Starting camera...');
                await startCamera();
                await new Promise(resolve => setTimeout(resolve, 2000));
              }

              if (!isRecording && isActive) {
                console.log('🎥 Starting recording...');
                startRecording();
              }

              console.log('✅ AI Detection started from Live Camera');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-400/30 group-hover:to-cyan-400/30 transition-all duration-300 border border-blue-400/20 group-hover:border-blue-400/40 shadow-lg">
                <Camera className="w-10 h-10 text-blue-300 drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors">Live Camera</h3>
              <p className="text-sm text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">View real-time camera feed with AI detection</p>
              <Badge variant={isActive ? "default" : "secondary"} className={`text-sm px-3 py-1 font-semibold ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white/10 text-slate-400 border-white/20"
              }`}>
                {isActive ? '● Active' : '○ Offline'}
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-white/10 hover:border-purple-400/50 bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-800/50 backdrop-blur-xl cursor-pointer shadow-xl hover:shadow-purple-500/25"
            onClick={async () => {
              // Trigger AI Detection Control and navigate
              console.log('🚀 Face Detection clicked - Starting AI Detection...');

              if (error) clearErrors();

              if (!isActive) {
                console.log('📹 Starting camera...');
                await startCamera();
                await new Promise(resolve => setTimeout(resolve, 2000));
              }

              if (!isRecording && isActive) {
                console.log('🎥 Starting recording...');
                startRecording();
              }

              console.log('✅ AI Detection started from Face Detection');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-all duration-300 border border-purple-400/20 group-hover:border-purple-400/40 shadow-lg">
                <Eye className="w-10 h-10 text-purple-300 drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-100 transition-colors">Face Detection</h3>
              <p className="text-sm text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">AI-powered facial recognition system</p>
              <Badge variant={facesDetected > 0 ? "default" : "secondary"} className={`text-sm px-3 py-1 font-semibold ${
                facesDetected > 0
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-slate-400 border-white/20"
              }`}>
                {facesDetected > 0 ? `● ${facesDetected} Detected` : '○ No Faces'}
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-white/10 hover:border-green-400/50 bg-gradient-to-br from-slate-800/50 via-green-900/30 to-slate-800/50 backdrop-blur-xl cursor-pointer shadow-xl hover:shadow-green-500/25"
            onClick={async () => {
              // Trigger AI Detection Control and navigate
              console.log('🚀 Recording clicked - Starting AI Detection...');

              if (error) clearErrors();

              if (!isActive) {
                console.log('📹 Starting camera...');
                await startCamera();
                await new Promise(resolve => setTimeout(resolve, 2000));
              }

              if (!isRecording && isActive) {
                console.log('🎥 Starting recording...');
                startRecording();
              }

              console.log('✅ AI Detection started from Recording');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-green-400/30 group-hover:to-emerald-400/30 transition-all duration-300 border border-green-400/20 group-hover:border-green-400/40 shadow-lg">
                <Video className="w-10 h-10 text-green-300 drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-100 transition-colors">Recording</h3>
              <p className="text-sm text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">HD video capture and intelligent storage</p>
              <Badge variant={isRecording ? "destructive" : "secondary"} className={`text-sm px-3 py-1 font-semibold ${
                isRecording
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse"
                  : "bg-white/10 text-slate-400 border-white/20"
              }`}>
                {isRecording ? '● Recording' : '○ Ready'}
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-white/10 hover:border-orange-400/50 bg-gradient-to-br from-slate-800/50 via-orange-900/30 to-slate-800/50 backdrop-blur-xl cursor-pointer shadow-xl hover:shadow-orange-500/25"
            onClick={async () => {
              // Trigger AI Detection Control and navigate
              console.log('🚀 Analytics clicked - Starting AI Detection...');

              if (error) clearErrors();

              if (!isActive) {
                console.log('📹 Starting camera...');
                await startCamera();
                await new Promise(resolve => setTimeout(resolve, 2000));
              }

              if (!isRecording && isActive) {
                console.log('🎥 Starting recording...');
                startRecording();
              }

              console.log('✅ AI Detection started from Analytics');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center group-hover:from-orange-400/30 group-hover:to-yellow-400/30 transition-all duration-300 border border-orange-400/20 group-hover:border-orange-400/40 shadow-lg">
                <BarChart3 className="w-10 h-10 text-orange-300 drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors">Analytics</h3>
              <p className="text-sm text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">Advanced performance insights & reporting</p>
              <Badge variant="outline" className="text-sm px-3 py-1 font-semibold bg-white/10 text-orange-300 border-orange-400/40 shadow-lg">
                📊 View Reports
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Camera Display - Full width composition */}
          <div className="space-y-6">
            {/* Camera Controls - Single line above live feed */}
            <div className="flex flex-wrap justify-center gap-3 p-4 bg-gradient-to-r from-slate-800/50 via-blue-900/30 to-slate-800/50 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
              {!isActive ? (
                <Button
                  variant="camera"
                  size="lg"
                  onClick={startCamera}
                  disabled={isLoading}
                  className="min-w-[140px]"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Starting...' : 'Start Camera'}
                </Button>
              ) : (
                <>
                  <Button
                    variant="camera-stop"
                    size="lg"
                    onClick={stopCamera}
                    className="min-w-[120px]"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>

                  {!isPaused ? (
                    <Button
                      variant="pause"
                      size="lg"
                      onClick={pauseCamera}
                      className="min-w-[120px]"
                    >
                      <div className="w-4 h-4 mr-2 flex items-center">
                        <div className="w-1 h-4 bg-current mr-0.5"></div>
                        <div className="w-1 h-4 bg-current"></div>
                      </div>
                      Pause
                    </Button>
                  ) : (
                    <Button
                      variant="camera"
                      size="lg"
                      onClick={resumeCamera}
                      className="min-w-[120px]"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}

                  <Button
                    variant="control"
                    size="lg"
                    onClick={captureSnapshot}
                    disabled={!isActive || isPaused}
                    className="min-w-[120px]"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Snapshot
                  </Button>

                  {!isRecording ? (
                    <Button
                      variant="action"
                      onClick={startRecording}
                      disabled={!isActive || isPaused}
                      className="min-w-[140px]"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      variant="camera-stop"
                      onClick={stopRecording}
                      className="min-w-[140px]"
                    >
                      <VideoOff className="w-4 h-4 mr-2" />
                      Stop Recording
                    </Button>
                  )}

                  <Button
                    variant="reset"
                    onClick={resetSystem}
                    className="min-w-[120px]"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearErrors}
                    disabled={!error}
                    className="min-w-[120px]"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Errors
                  </Button>
                </>
              )}
            </div>

            {/* Camera Section */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Live Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CameraDisplay
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  isActive={isActive}
                  isPaused={isPaused}
                  facesDetected={facesDetected}
                  isRecording={isRecording}
                  error={error}
                  facialLandmarks={facialLandmarks}
                />
              </CardContent>
            </Card>

            {/* Quick Stats - Enhanced Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {isActive ? '1' : '0'}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Active Cameras
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-blue-500/30 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Eye className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-blue-500 mb-1">
                    {facesDetected}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Faces Detected
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-orange-500/30 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    {stats.fps}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    FPS
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-green-500/30 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-green-500 mb-1">
                    {error ? '✗' : '✓'}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    System Health
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Bot className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold text-muted-foreground">
                    {isPaused ? 'Yes' : 'No'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Camera Paused
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Cpu className="w-8 h-8 mx-auto mb-2 text-info" />
                  <div className="text-2xl font-bold text-info">
                    {stats.resolution}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Resolution
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Video className="w-8 h-8 mx-auto mb-2 text-destructive" />
                  <div className="text-2xl font-bold text-destructive">
                    {isRecording ? 'REC' : 'OFF'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Recording Status
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">
                    {isActive && !isPaused ? '30' : '0'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Processing Rate
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Professional Dashboard Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">
              {/* Daily Statistics */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-emerald-500/30 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                    </div>
                    Daily Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Faces Detected</span>
                    <span className="text-sm font-bold text-emerald-600">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recording Time</span>
                    <span className="text-sm font-bold text-blue-600">6.5h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">System Uptime</span>
                    <span className="text-sm font-bold text-green-600">98.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Alerts Today</span>
                    <span className="text-sm font-bold text-orange-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Accuracy</span>
                    <span className="text-sm font-bold text-purple-600">96.4%</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Overview */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    System Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <Badge variant="outline">24h 32m</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">CPU Usage</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Memory</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-blue-500/30 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </div>
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg FPS</span>
                    <span className="text-sm font-medium text-green-500">28.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Detection Rate</span>
                    <span className="text-sm font-medium text-blue-500">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Latency</span>
                    <span className="text-sm font-medium text-yellow-500">12ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-sm font-medium text-purple-500">96.8%</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-orange-500/30 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    </div>
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      High CPU usage detected
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Wifi className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Network latency spike
                    </AlertDescription>
                  </Alert>
                  <div className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      2 Active Alerts
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Log */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-purple-500/30 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-32">
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <Clock className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Camera started</span>
                          <span className="text-muted-foreground ml-1">2 min ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Eye className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Face detected</span>
                          <span className="text-muted-foreground ml-1">5 min ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Video className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Recording started</span>
                          <span className="text-muted-foreground ml-1">8 min ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Shield className="w-3 h-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">System health check</span>
                          <span className="text-muted-foreground ml-1">12 min ago</span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>


      {/* Floating AI Assistant */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 z-50"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open AI Assistant</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          <AIChat />
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg">FaceCam Control Hub</h3>
                  <p className="text-sm text-muted-foreground">Enterprise AI-Powered Security</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Advanced face detection and camera management system designed for enterprise security,
                featuring real-time AI analysis, sentiment detection, and comprehensive monitoring capabilities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3">Core Features</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Real-time face detection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  HD video recording
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  AI-powered analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Sentiment analysis
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3">System Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Camera:</span>
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs font-medium">
                    {isActive ? '● Online' : '○ Offline'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Detection:</span>
                  <Badge variant={facesDetected > 0 ? "default" : "secondary"} className="text-xs font-medium">
                    {facesDetected > 0 ? '● Active' : '○ Idle'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">AI Status:</span>
                  <Badge variant="outline" className="text-xs font-medium border-green-500 text-green-600">
                    ● Operational
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 FaceCam Control Hub. Enterprise-grade AI security solutions.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">System Health:</span>
                <Badge variant={error ? "destructive" : "outline"} className="font-medium">
                  {error ? '⚠ Critical' : '✓ Optimal'}
                </Badge>
              </div>
              {isActive && (
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600 font-medium">
                  🔴 Live Monitoring
                </Badge>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;