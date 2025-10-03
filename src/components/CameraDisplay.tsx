import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Camera, AlertTriangle } from 'lucide-react';
import { FacialLandmarks } from '@/hooks/useCamera';

interface CameraDisplayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  isPaused: boolean;
  facesDetected: number;
  isRecording: boolean;
  error: string | null;
  facialLandmarks?: FacialLandmarks[];
}

export const CameraDisplay: React.FC<CameraDisplayProps> = ({
  videoRef,
  canvasRef,
  isActive,
  isPaused,
  facesDetected,
  isRecording,
  error,
  facialLandmarks = []
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
        
        {/* Facial Landmark Detection */}
        {facialLandmarks.length > 0 && isActive && !isPaused && (
          <div className="absolute inset-0 pointer-events-none">
            {facialLandmarks.map((landmarks, faceIndex) => (
              <div key={faceIndex} className="relative">
                {/* Draw facial landmarks as dots */}
                {landmarks.positions.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="absolute w-1 h-1 bg-red-500 rounded-full opacity-80"
                    style={{
                      left: `${point.x}px`,
                      top: `${point.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Draw connecting lines for facial features */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  {/* Jawline (points 0-16) */}
                  <polyline
                    points={landmarks.positions.slice(0, 17).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#00ff00"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Left eyebrow (points 17-21) */}
                  <polyline
                    points={landmarks.positions.slice(17, 22).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Right eyebrow (points 22-26) */}
                  <polyline
                    points={landmarks.positions.slice(22, 27).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Nose bridge (points 27-30) */}
                  <polyline
                    points={landmarks.positions.slice(27, 31).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ffff00"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Nose bottom (points 31-35) */}
                  <polyline
                    points={landmarks.positions.slice(31, 36).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ffff00"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Left eye (points 36-41) */}
                  <polyline
                    points={landmarks.positions.slice(36, 42).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#0000ff"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Right eye (points 42-47) */}
                  <polyline
                    points={landmarks.positions.slice(42, 48).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#0000ff"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Outer mouth (points 48-59) */}
                  <polyline
                    points={landmarks.positions.slice(48, 60).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ff00ff"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Inner mouth (points 60-67) */}
                  <polyline
                    points={landmarks.positions.slice(60, 68).map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ff00ff"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                </svg>

                {/* Face label */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                  Face {faceIndex + 1} - {landmarks.positions.length} landmarks
                </div>

                {/* Expression display */}
                {landmarks.expressions && (
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {Object.entries(landmarks.expressions)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 1)
                      .map(([emotion, confidence]) => `${emotion}: ${(confidence * 100).toFixed(0)}%`)}
                  </div>
                )}
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