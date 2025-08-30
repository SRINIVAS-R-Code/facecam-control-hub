import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Camera, AlertTriangle } from 'lucide-react';

interface CameraDisplayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  isPaused: boolean;
  facesDetected: number;
  isRecording: boolean;
  error: string | null;
}

export const CameraDisplay: React.FC<CameraDisplayProps> = ({
  videoRef,
  canvasRef,
  isActive,
  isPaused,
  facesDetected,
  isRecording,
  error
}) => {
  return (
    <Card className="relative gradient-card border-border shadow-card overflow-hidden">
      <div className="aspect-video bg-status-bg relative">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isActive ? 'camera-active' : ''} ${isPaused ? 'opacity-50' : ''}`}
        />
        
        {/* Hidden Canvas for Snapshots */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-warning/90 text-warning-foreground px-6 py-3 rounded-lg font-semibold text-lg shadow-lg">
              ⏸️ CAMERA PAUSED
            </div>
          </div>
        )}
        
        {/* Status Overlays */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {/* Camera Status */}
          <Badge 
            variant={isActive ? "default" : "secondary"} 
            className={isActive && !isPaused ? 'bg-camera-active status-indicator' : 'bg-muted'}
          >
            {isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
            {isActive ? (isPaused ? 'PAUSED' : 'LIVE') : 'OFFLINE'}
          </Badge>
          
          {/* Recording Status */}
          {isRecording && !isPaused && (
            <Badge variant="destructive" className="status-indicator">
              <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
              REC
            </Badge>
          )}
          
          {/* Face Detection */}
          {isActive && !isPaused && (
            <Badge 
              variant="outline" 
              className="bg-detection-highlight/20 border-detection-highlight text-detection-highlight"
            >
              👤 {facesDetected} Face{facesDetected !== 1 ? 's' : ''}
            </Badge>
          )}
          
          {/* Paused Status */}
          {isPaused && (
            <Badge variant="outline" className="bg-warning/20 border-warning text-warning">
              ⏸️ PAUSED
            </Badge>
          )}
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="absolute top-4 right-4">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Error
            </Badge>
          </div>
        )}
        
        {/* Face Detection Boxes */}
        {facesDetected > 0 && isActive && !isPaused && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: facesDetected }).map((_, index) => (
              <div
                key={index}
                className="absolute border-2 border-detection-highlight face-detection-box"
                style={{
                  left: `${20 + index * 30}%`,
                  top: `${25 + index * 15}%`,
                  width: '200px',
                  height: '200px',
                }}
              >
                <div className="absolute -top-6 left-0 text-xs text-detection-highlight font-mono">
                  Face {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Camera Inactive Placeholder */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-status-bg/80">
            <div className="text-center text-muted-foreground">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Camera Offline</p>
              <p className="text-sm">Click "Start Camera" to begin face detection</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};