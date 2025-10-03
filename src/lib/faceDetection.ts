import * as faceapi from 'face-api.js';

export let modelsLoaded = false;

export const loadFaceDetectionModels = async () => {
  if (modelsLoaded) return;

  try {
    // Try to load models from local directory first
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);
    modelsLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.warn('Face detection models not found locally. Using simulation mode.');
    console.warn('To enable real face detection, download models from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights');
    console.warn('Place them in the public/models/ directory');
    // Don't throw error - allow fallback to simulation
    modelsLoaded = false;
  }
};

export const detectFaces = async (videoElement: HTMLVideoElement) => {
  if (!modelsLoaded) {
    throw new Error('Face detection models not loaded');
  }

  try {
    const detections = await faceapi
      .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    return detections;
  } catch (error) {
    console.error('Face detection failed:', error);
    return [];
  }
};

export interface FaceDetectionResult {
  detection: faceapi.FaceDetection;
  landmarks: faceapi.FaceLandmarks68;
  expressions: faceapi.FaceExpressions;
}