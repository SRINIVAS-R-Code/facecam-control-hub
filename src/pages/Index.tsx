import React from 'react';
import { useCamera } from '@/hooks/useCamera';
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
  FileText
} from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
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
    getStats
  } = useCamera();

  const stats = getStats();

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                <Bot className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  FaceCam Control Hub
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Enterprise Face Detection & AI Management System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-muted-foreground">LIVE</span>
              </div>

              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`font-semibold ${isActive ? "bg-green-500 hover:bg-green-600 shadow-sm" : ""}`}
              >
                <Cpu className="w-3 h-3 mr-1" />
                {isActive ? 'SYSTEM ACTIVE' : 'SYSTEM OFFLINE'}
              </Badge>

              {facesDetected > 0 && (
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 border-blue-500/30 text-blue-600 font-semibold shadow-sm"
                >
                  <Eye className="w-3 h-3 mr-1" />
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

                        // Keep camera and recording active throughout the demo
                        console.log('🔄 Starting automated navigation tour...');

                        // Use longer delays and ensure camera stays active
                        setTimeout(() => {
                          if (isActive) {
                            console.log('📍 Navigating to Face Detection');
                            navigate('/face-detection');
                          }
                        }, 3000);

                        setTimeout(() => {
                          if (isActive) {
                            console.log('📍 Navigating to Recording');
                            navigate('/recording');
                          }
                        }, 6000);

                        setTimeout(() => {
                          if (isActive) {
                            console.log('📍 Navigating to Analytics');
                            navigate('/analytics');
                          }
                        }, 9000);

                        setTimeout(() => {
                          if (isActive) {
                            console.log('🏠 Returning to Dashboard');
                            navigate('/');
                            console.log('🎉 AI Detection tour completed successfully!');
                          }
                        }, 12000);

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
            className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/80 cursor-pointer"
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

              // Navigate through all sections
              setTimeout(() => navigate('/face-detection'), 3000);
              setTimeout(() => navigate('/recording'), 6000);
              setTimeout(() => navigate('/analytics'), 9000);
              setTimeout(() => navigate('/'), 12000);

              console.log('✅ AI Detection tour started from Live Camera');
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Camera</h3>
              <p className="text-sm text-muted-foreground mb-3">View real-time camera feed</p>
              <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                {isActive ? 'Active' : 'Offline'}
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-blue-500/30 bg-gradient-to-br from-card to-card/80 cursor-pointer"
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

              // Navigate through all sections
              setTimeout(() => navigate('/recording'), 3000);
              setTimeout(() => navigate('/analytics'), 6000);
              setTimeout(() => navigate('/face-detection'), 9000);
              setTimeout(() => navigate('/'), 12000);

              console.log('✅ AI Detection tour started from Face Detection');
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Face Detection</h3>
              <p className="text-sm text-muted-foreground mb-3">AI-powered face recognition</p>
              <Badge variant={facesDetected > 0 ? "default" : "secondary"} className="text-xs">
                {facesDetected} Detected
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-green-500/30 bg-gradient-to-br from-card to-card/80 cursor-pointer"
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

              // Navigate through all sections
              setTimeout(() => navigate('/analytics'), 3000);
              setTimeout(() => navigate('/face-detection'), 6000);
              setTimeout(() => navigate('/recording'), 9000);
              setTimeout(() => navigate('/'), 12000);

              console.log('✅ AI Detection tour started from Recording');
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Video className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Recording</h3>
              <p className="text-sm text-muted-foreground mb-3">Video capture & storage</p>
              <Badge variant={isRecording ? "destructive" : "secondary"} className="text-xs">
                {isRecording ? 'Recording' : 'Ready'}
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-purple-500/30 bg-gradient-to-br from-card to-card/80 cursor-pointer"
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

              // Navigate through all sections
              setTimeout(() => navigate('/face-detection'), 3000);
              setTimeout(() => navigate('/recording'), 6000);
              setTimeout(() => navigate('/analytics'), 9000);
              setTimeout(() => navigate('/'), 12000);

              console.log('✅ AI Detection tour started from Analytics');
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground mb-3">Performance insights</p>
              <Badge variant="outline" className="text-xs">
                View Reports
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Camera Display - Now secondary, takes up 8 columns */}
          <div className="xl:col-span-8 space-y-6">
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

          {/* Control Panel - Takes up 4 columns on extra large screens */}
          <div className="xl:col-span-4">
            <ControlPanel
              stats={stats}
              isLoading={isLoading}
              error={error}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              onPauseCamera={pauseCamera}
              onResumeCamera={resumeCamera}
              onResetSystem={resetSystem}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onCaptureSnapshot={captureSnapshot}
              onClearErrors={clearErrors}
            />
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