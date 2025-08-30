import React from 'react';
import { useCamera } from '@/hooks/useCamera';
import { CameraDisplay } from '@/components/CameraDisplay';
import { ControlPanel } from '@/components/ControlPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Eye,
  Camera,
  Bot
} from 'lucide-react';

const Index = () => {
  const {
    isActive,
    isLoading,
    facesDetected,
    isRecording,
    error,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    captureSnapshot,
    clearErrors,
    getStats
  } = useCamera();

  const stats = getStats();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  FaceCam Control Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Advanced Face Detection & Camera Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                className={isActive ? "status-indicator" : ""}
              >
                <Cpu className="w-3 h-3 mr-1" />
                {isActive ? 'SYSTEM ACTIVE' : 'SYSTEM OFFLINE'}
              </Badge>
              
              {facesDetected > 0 && (
                <Badge 
                  variant="outline" 
                  className="bg-detection-highlight/20 border-detection-highlight text-detection-highlight"
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
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Display - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <CameraDisplay
              videoRef={videoRef}
              canvasRef={canvasRef}
              isActive={isActive}
              facesDetected={facesDetected}
              isRecording={isRecording}
              error={error}
            />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">
                    {isActive ? '1' : '0'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Cameras
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-detection-highlight" />
                  <div className="text-2xl font-bold text-detection-highlight">
                    {facesDetected}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Faces Detected
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
                  <div className="text-2xl font-bold text-warning">
                    {stats.fps}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    FPS
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold text-success">
                    {error ? '✗' : '✓'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    System Health
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              stats={stats}
              isLoading={isLoading}
              error={error}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onCaptureSnapshot={captureSnapshot}
              onClearErrors={clearErrors}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4" />
                FaceCam Control Hub
              </h3>
              <p className="text-sm text-muted-foreground">
                Professional-grade face detection and camera management system 
                for enterprise applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-3">Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time face detection</li>
                <li>• HD video recording</li>
                <li>• Instant snapshots</li>
                <li>• System monitoring</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-3">System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Camera:</span>
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                    {isActive ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Detection:</span>
                  <Badge variant={facesDetected > 0 ? "default" : "secondary"} className="text-xs">
                    {facesDetected > 0 ? 'Active' : 'Idle'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recording:</span>
                  <Badge variant={isRecording ? "destructive" : "secondary"} className="text-xs">
                    {isRecording ? 'Recording' : 'Stopped'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 FaceCam Control Hub. Professional camera management system.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Status: {error ? 'Error Detected' : 'All Systems Operational'}</span>
              {isActive && (
                <Badge variant="outline" className="status-indicator">
                  Live
                </Badge>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;