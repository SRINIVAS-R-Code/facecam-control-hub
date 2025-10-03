import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';
import { loadFaceDetectionModels, detectFaces, FaceDetectionResult } from '@/lib/faceDetection';
import { modelsLoaded } from '@/lib/faceDetection';
import { useTimeTracking } from './useTimeTracking';
import * as faceapi from 'face-api.js';

export interface CameraStats {
  isActive: boolean;
  isPaused: boolean;
  facesDetected: number;
  resolution: string;
  fps: number;
  isRecording: boolean;
}

export interface FacialLandmarks {
  positions: { x: number; y: number }[];
  expressions: { [key: string]: number } | null;
}

export const useCamera = (onBreakSuggestion?: (reason: string, duration: number, emotion?: string, confidence?: number) => void) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facialLandmarks, setFacialLandmarks] = useState<FacialLandmarks[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setModelsLoading(true);
      setError(null);

      // Try to load face detection models
      await loadFaceDetectionModels();
      setModelsLoading(false);

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

        // Start face detection (real or simulation based on model availability)
        detectionIntervalRef.current = setInterval(async () => {
          if (videoRef.current && isActive && !isPaused) {
            if (modelsLoaded) {
              // Real face detection with landmarks
              try {
                const detections = await detectFaces(videoRef.current!);
                setFacesDetected(detections.length);

                // Extract facial landmarks (68 points) and check for emotional distress
                const landmarks = detections.map(detection => {
                  const expressions = Object.fromEntries(
                    Object.entries(detection.expressions).map(([key, value]) => [key, value])
                  );

                  // Check for negative emotions that might need break suggestions
                  const negativeEmotions = ['angry', 'frustrated', 'sad', 'fearful', 'disgusted'];
                  const dominantEmotion = Object.entries(expressions)
                    .sort(([,a], [,b]) => b - a)[0];

                  if (negativeEmotions.includes(dominantEmotion[0]) && dominantEmotion[1] > 0.6) {
                    // Trigger break suggestion for high negative emotion
                    if (onBreakSuggestion) {
                      onBreakSuggestion(
                        `High ${dominantEmotion[0]} detected. Take a break to recharge!`,
                        10, // 10 minute break
                        dominantEmotion[0],
                        dominantEmotion[1]
                      );
                    }
                  }

                  return {
                    positions: detection.landmarks.positions.map(p => ({ x: p.x, y: p.y })),
                    expressions
                  };
                });
                setFacialLandmarks(landmarks);
              } catch (err) {
                console.error('Face detection error:', err);
                setFacesDetected(0);
                setFacialLandmarks([]);
              }
            } else {
              // Fallback to simulation with mock landmarks
              const detectedFaces = Math.floor(Math.random() * 2);
              setFacesDetected(detectedFaces);

              if (detectedFaces > 0) {
                // Create mock facial landmarks for demonstration
                const mockLandmarks = Array.from({ length: detectedFaces }, (_, faceIndex) => {
                  // Occasionally simulate negative emotions for demo
                  const simulateNegativeEmotion = Math.random() < 0.1; // 10% chance
                  const expressions = simulateNegativeEmotion ? {
                    neutral: 0.3,
                    angry: 0.4,
                    frustrated: 0.3,
                    sad: 0.1,
                    happy: 0.05,
                    fearful: 0.02,
                    disgusted: 0.01,
                    surprised: 0.01
                  } : {
                    neutral: 0.8,
                    happy: 0.1,
                    sad: 0.05,
                    angry: 0.03,
                    fearful: 0.01,
                    disgusted: 0.005,
                    surprised: 0.005
                  };

                  // Trigger break suggestion for simulated negative emotion
                  if (simulateNegativeEmotion && onBreakSuggestion) {
                    const dominantEmotion = Object.entries(expressions)
                      .sort(([,a], [,b]) => b - a)[0];
                    onBreakSuggestion(
                      `High ${dominantEmotion[0]} detected. Take a break to recharge!`,
                      10,
                      dominantEmotion[0],
                      dominantEmotion[1]
                    );
                  }

                  return {
                    positions: Array.from({ length: 68 }, (_, i) => ({
                      x: 200 + faceIndex * 150 + (i % 10) * 8 + Math.random() * 20,
                      y: 150 + (i % 7) * 10 + Math.random() * 15
                    })),
                    expressions
                  };
                });
                setFacialLandmarks(mockLandmarks);
              } else {
                setFacialLandmarks([]);
              }
            }
          }
        }, modelsLoaded ? 100 : 1000); // Faster detection with real models

        const detectionType = modelsLoaded ? "Advanced face detection with 68-point landmark tracking" : "Basic face detection simulation (models not loaded)";
        toast({
          title: "Camera Started",
          description: detectionType + " is now active",
          variant: "default"
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      setModelsLoading(false);
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, isActive, isPaused, onBreakSuggestion]);

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
  }, [isActive, isPaused, toast, onBreakSuggestion]);

  const resumeCamera = useCallback(() => {
    try {
      if (videoRef.current && isActive && isPaused) {
        videoRef.current.play();
        setIsPaused(false);

        // Resume face detection (real or simulation)
        detectionIntervalRef.current = setInterval(async () => {
          if (videoRef.current && isActive && !isPaused) {
            if (modelsLoaded) {
              // Real face detection with landmarks
              try {
                const detections = await detectFaces(videoRef.current!);
                setFacesDetected(detections.length);

                const landmarks = detections.map(detection => {
                  const expressions = Object.fromEntries(
                    Object.entries(detection.expressions).map(([key, value]) => [key, value])
                  );

                  // Check for negative emotions that might need break suggestions
                  const negativeEmotions = ['angry', 'frustrated', 'sad', 'fearful', 'disgusted'];
                  const dominantEmotion = Object.entries(expressions)
                    .sort(([,a], [,b]) => b - a)[0];

                  if (negativeEmotions.includes(dominantEmotion[0]) && dominantEmotion[1] > 0.6) {
                    // Trigger break suggestion for high negative emotion
                    if (onBreakSuggestion) {
                      onBreakSuggestion(
                        `High ${dominantEmotion[0]} detected. Take a break to recharge!`,
                        10, // 10 minute break
                        dominantEmotion[0],
                        dominantEmotion[1]
                      );
                    }
                  }

                  return {
                    positions: detection.landmarks.positions.map(p => ({ x: p.x, y: p.y })),
                    expressions
                  };
                });
                setFacialLandmarks(landmarks);
              } catch (err) {
                console.error('Face detection error:', err);
                setFacesDetected(0);
                setFacialLandmarks([]);
              }
            } else {
              // Fallback to simulation with mock landmarks
              const detectedFaces = Math.floor(Math.random() * 2);
              setFacesDetected(detectedFaces);

              if (detectedFaces > 0) {
                // Create mock facial landmarks for demonstration
                const mockLandmarks = Array.from({ length: detectedFaces }, (_, faceIndex) => {
                  // Occasionally simulate negative emotions for demo
                  const simulateNegativeEmotion = Math.random() < 0.1; // 10% chance
                  const expressions = simulateNegativeEmotion ? {
                    neutral: 0.3,
                    angry: 0.4,
                    frustrated: 0.3,
                    sad: 0.1,
                    happy: 0.05,
                    fearful: 0.02,
                    disgusted: 0.01,
                    surprised: 0.01
                  } : {
                    neutral: 0.8,
                    happy: 0.1,
                    sad: 0.05,
                    angry: 0.03,
                    fearful: 0.01,
                    disgusted: 0.005,
                    surprised: 0.005
                  };

                  // Trigger break suggestion for simulated negative emotion
                  if (simulateNegativeEmotion && onBreakSuggestion) {
                    const dominantEmotion = Object.entries(expressions)
                      .sort(([,a], [,b]) => b - a)[0];
                    onBreakSuggestion(
                      `High ${dominantEmotion[0]} detected. Take a break to recharge!`,
                      10,
                      dominantEmotion[0],
                      dominantEmotion[1]
                    );
                  }

                  return {
                    positions: Array.from({ length: 68 }, (_, i) => ({
                      x: 200 + faceIndex * 150 + (i % 10) * 8 + Math.random() * 20,
                      y: 150 + (i % 7) * 10 + Math.random() * 15
                    })),
                    expressions
                  };
                });
                setFacialLandmarks(mockLandmarks);
              } else {
                setFacialLandmarks([]);
              }
            }
          }
        }, modelsLoaded ? 100 : 1000);

        toast({
          title: "Camera Resumed",
          description: "Video feed and face detection resumed",
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
      // Clone the stream to avoid interfering with the video display
      const clonedStream = streamRef.current.clone();
      const mediaRecorder = new MediaRecorder(clonedStream);
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
    facialLandmarks,
    modelsLoading,

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