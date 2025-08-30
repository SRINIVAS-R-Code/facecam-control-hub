import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Square, 
  Camera, 
  Video, 
  VideoOff, 
  RefreshCw, 
  Trash2,
  Eye,
  Monitor,
  Zap
} from 'lucide-react';
import type { CameraStats } from '@/hooks/useCamera';

interface ControlPanelProps {
  stats: CameraStats;
  isLoading: boolean;
  error: string | null;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCaptureSnapshot: () => void;
  onClearErrors: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  stats,
  isLoading,
  error,
  onStartCamera,
  onStopCamera,
  onStartRecording,
  onStopRecording,
  onCaptureSnapshot,
  onClearErrors
}) => {
  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <Card className="gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5" />
            Camera Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primary Camera Controls */}
          <div className="flex flex-wrap gap-3">
            {!stats.isActive ? (
              <Button
                variant="camera"
                size="lg"
                onClick={onStartCamera}
                disabled={isLoading}
                className="flex-1 min-w-[140px]"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Starting...' : 'Start Camera'}
              </Button>
            ) : (
              <Button
                variant="camera-stop"
                size="lg"
                onClick={onStopCamera}
                className="flex-1 min-w-[140px]"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Camera
              </Button>
            )}
            
            <Button
              variant="control"
              size="lg"
              onClick={onCaptureSnapshot}
              disabled={!stats.isActive}
              className="flex-1 min-w-[140px]"
            >
              <Camera className="w-4 h-4 mr-2" />
              Snapshot
            </Button>
          </div>
          
          {/* Recording Controls */}
          <Separator />
          <div className="flex flex-wrap gap-3">
            {!stats.isRecording ? (
              <Button
                variant="action"
                onClick={onStartRecording}
                disabled={!stats.isActive}
                className="flex-1"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button
                variant="camera-stop"
                onClick={onStopRecording}
                className="flex-1"
              >
                <VideoOff className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={onClearErrors}
              disabled={!error}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Errors
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Panel */}
      <Card className="gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Monitor className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Camera Status
              </span>
              <Badge variant={stats.isActive ? "default" : "secondary"}>
                {stats.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Video className="w-3 h-3" />
                Recording
              </span>
              <Badge variant={stats.isRecording ? "destructive" : "secondary"}>
                {stats.isRecording ? 'Recording' : 'Stopped'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">👤 Faces</span>
              <Badge 
                variant="outline" 
                className="bg-detection-highlight/20 border-detection-highlight text-detection-highlight"
              >
                {stats.facesDetected}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Resolution</span>
              <Badge variant="outline">{stats.resolution}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">FPS</span>
              <Badge variant="outline">{stats.fps}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={error ? "destructive" : "default"}>
                {error ? 'Error' : 'Ready'}
              </Badge>
            </div>
          </div>
          
          {/* Error Display */}
          {error && (
            <>
              <Separator />
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive font-medium">Error Details:</p>
                <p className="text-xs text-destructive/80 mt-1">{error}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};