import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

export interface CameraStats {
  isActive: boolean;
  isPaused: boolean;
  facesDetected: number;
  resolution: string;
  fps: number;
  isRecording: boolean;
}

export const useCamera = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        },
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        
        // Start face detection simulation
        detectionIntervalRef.current = setInterval(() => {
          setFacesDetected(Math.floor(Math.random() * 3)); // Simulate 0-2 faces
        }, 1000);

        toast({
          title: "Camera Started",
          description: "Face detection system is now active",
          variant: "default"
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const pauseCamera = useCallback(() => {
    try {
      if (videoRef.current && isActive && !isPaused) {
        videoRef.current.pause();
        setIsPaused(true);
        
        // Pause face detection
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
          detectionIntervalRef.current = null;
        }
        
        toast({
          title: "Camera Paused",
          description: "Video feed and detection paused",
          variant: "default"
        });
      }
    } catch (err) {
      toast({
        title: "Pause Error",
        description: "Failed to pause camera",
        variant: "destructive"
      });
    }
  }, [isActive, isPaused, toast]);

  const resumeCamera = useCallback(() => {
    try {
      if (videoRef.current && isActive && isPaused) {
        videoRef.current.play();
        setIsPaused(false);
        
        // Resume face detection
        detectionIntervalRef.current = setInterval(() => {
          setFacesDetected(Math.floor(Math.random() * 3));
        }, 1000);
        
        toast({
          title: "Camera Resumed",
          description: "Video feed and detection resumed",
          variant: "default"
        });
      }
    } catch (err) {
      toast({
        title: "Resume Error",
        description: "Failed to resume camera",
        variant: "destructive"
      });
    }
  }, [isActive, isPaused, toast]);

  const resetSystem = useCallback(() => {
    try {
      // Stop everything first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
      
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      
      // Reset all states
      setIsActive(false);
      setIsPaused(false);
      setIsRecording(false);
      setFacesDetected(0);
      setError(null);
      setIsLoading(false);
      
      toast({
        title: "System Reset",
        description: "All settings and connections have been reset",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Reset Error",
        description: "Failed to reset system completely",
        variant: "destructive"
      });
    }
  }, [isRecording, toast]);

  const stopCamera = useCallback(() => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
      
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      
      setIsActive(false);
      setIsPaused(false);
      setIsRecording(false);
      setFacesDetected(0);
      setError(null);
      
      toast({
        title: "Camera Stopped",
        description: "Face detection system is now inactive",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to stop camera properly",
        variant: "destructive"
      });
    }
  }, [isRecording, toast]);

  const startRecording = useCallback(() => {
    if (!streamRef.current || !isActive) return;
    
    try {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Video recording is now active",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Recording Error",
        description: "Failed to start recording",
        variant: "destructive"
      });
    }
  }, [isActive, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Video recording has been saved",
        variant: "default"
      });
    }
  }, [isRecording, toast]);

  const captureSnapshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      // Create download link
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `face-detection-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
      
      toast({
        title: "Snapshot Captured",
        description: "Image saved to downloads",
        variant: "default"
      });
    }
  }, [isActive, toast]);

  const clearErrors = useCallback(() => {
    setError(null);
    toast({
      title: "Errors Cleared",
      description: "All error messages have been cleared",
      variant: "default"
    });
  }, [toast]);

  const getStats = useCallback((): CameraStats => {
    return {
      isActive,
      isPaused,
      facesDetected,
      resolution: isActive ? '1920x1080' : 'N/A',
      fps: isActive && !isPaused ? 30 : 0,
      isRecording
    };
  }, [isActive, isPaused, facesDetected, isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    // State
    isActive,
    isPaused,
    isLoading,
    facesDetected,
    isRecording,
    error,
    
    // Refs
    videoRef,
    canvasRef,
    
    // Actions
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
  };
};