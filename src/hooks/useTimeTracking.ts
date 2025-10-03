import { useState, useEffect, useCallback } from 'react';

export interface WorkSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  breaks: Break[];
  emotionalAlerts: EmotionalAlert[];
}

export interface Break {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  reason: 'scheduled' | 'emotional' | 'manual';
  emotionalTrigger?: string;
}

export interface EmotionalAlert {
  id: string;
  timestamp: Date;
  emotion: string;
  confidence: number;
  suggestedAction: string;
  breakTaken: boolean;
}

export interface BreakSettings {
  workDurationHours: number;
  breakDurationMinutes: number;
  emotionalBreakThreshold: number; // confidence level to trigger break
  emotionalBreakDuration: number; // minutes
  enableAutoBreaks: boolean;
  enableEmotionalDetection: boolean;
}

const DEFAULT_BREAK_SETTINGS: BreakSettings = {
  workDurationHours: 8,
  breakDurationMinutes: 15,
  emotionalBreakThreshold: 0.7,
  emotionalBreakDuration: 10,
  enableAutoBreaks: true,
  enableEmotionalDetection: true,
};

export const useTimeTracking = () => {
  const [currentSession, setCurrentSession] = useState<WorkSession | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentBreak, setCurrentBreak] = useState<Break | null>(null);
  const [workDuration, setWorkDuration] = useState(0); // in minutes
  const [breakSettings, setBreakSettings] = useState<BreakSettings>(DEFAULT_BREAK_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('breakSettings');
    if (saved) {
      try {
        setBreakSettings({ ...DEFAULT_BREAK_SETTINGS, ...JSON.parse(saved) });
      } catch (error) {
        console.error('Failed to load break settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((settings: Partial<BreakSettings>) => {
    const newSettings = { ...breakSettings, ...settings };
    setBreakSettings(newSettings);
    localStorage.setItem('breakSettings', JSON.stringify(newSettings));
  }, [breakSettings]);

  // Start work session
  const startWorkSession = useCallback(() => {
    const session: WorkSession = {
      id: `session_${Date.now()}`,
      startTime: new Date(),
      duration: 0,
      breaks: [],
      emotionalAlerts: [],
    };
    setCurrentSession(session);
    setWorkDuration(0);
    localStorage.setItem('currentSession', JSON.stringify(session));
  }, []);

  // End work session
  const endWorkSession = useCallback(() => {
    if (currentSession) {
      const endedSession: WorkSession = {
        ...currentSession,
        endTime: new Date(),
        duration: workDuration,
      };

      // Save to session history
      const history = JSON.parse(localStorage.getItem('workHistory') || '[]');
      history.push(endedSession);
      localStorage.setItem('workHistory', JSON.stringify(history.slice(-50))); // Keep last 50 sessions

      setCurrentSession(null);
      setIsOnBreak(false);
      setCurrentBreak(null);
      localStorage.removeItem('currentSession');
    }
  }, [currentSession, workDuration]);

  // Start a break
  const startBreak = useCallback((reason: 'scheduled' | 'emotional' | 'manual' = 'manual', emotionalTrigger?: string) => {
    if (!currentSession || isOnBreak) return;

    const breakItem: Break = {
      id: `break_${Date.now()}`,
      startTime: new Date(),
      duration: 0,
      reason,
      emotionalTrigger,
    };

    setCurrentBreak(breakItem);
    setIsOnBreak(true);
  }, [currentSession, isOnBreak]);

  // End current break
  const endBreak = useCallback(() => {
    if (!currentBreak || !currentSession) return;

    const endedBreak: Break = {
      ...currentBreak,
      endTime: new Date(),
      duration: Math.round((Date.now() - currentBreak.startTime.getTime()) / (1000 * 60)),
    };

    const updatedSession: WorkSession = {
      ...currentSession,
      breaks: [...currentSession.breaks, endedBreak],
    };

    setCurrentSession(updatedSession);
    setCurrentBreak(null);
    setIsOnBreak(false);
    localStorage.setItem('currentSession', JSON.stringify(updatedSession));
  }, [currentBreak, currentSession]);

  // Record emotional alert
  const recordEmotionalAlert = useCallback((emotion: string, confidence: number, suggestedAction: string) => {
    if (!currentSession) return;

    const alert: EmotionalAlert = {
      id: `alert_${Date.now()}`,
      timestamp: new Date(),
      emotion,
      confidence,
      suggestedAction,
      breakTaken: false,
    };

    const updatedSession: WorkSession = {
      ...currentSession,
      emotionalAlerts: [...currentSession.emotionalAlerts, alert],
    };

    setCurrentSession(updatedSession);
    localStorage.setItem('currentSession', JSON.stringify(updatedSession));

    return alert;
  }, [currentSession]);

  // Check if break is needed based on time or emotion
  const shouldTakeBreak = useCallback((emotion?: string, confidence?: number): { needed: boolean; reason: string; duration: number } => {
    if (!breakSettings.enableAutoBreaks) {
      return { needed: false, reason: '', duration: 0 };
    }

    // Time-based break check
    const workHours = workDuration / 60;
    if (workHours >= breakSettings.workDurationHours) {
      return {
        needed: true,
        reason: `You've been working for ${Math.round(workHours)} hours. Time for a break!`,
        duration: breakSettings.breakDurationMinutes,
      };
    }

    // Emotional break check
    if (breakSettings.enableEmotionalDetection && emotion && confidence !== undefined) {
      const negativeEmotions = ['angry', 'frustrated', 'sad', 'fearful', 'disgusted'];
      if (negativeEmotions.includes(emotion.toLowerCase()) && confidence >= breakSettings.emotionalBreakThreshold) {
        return {
          needed: true,
          reason: `High ${emotion} detected (${Math.round(confidence * 100)}%). Take a break to recharge!`,
          duration: breakSettings.emotionalBreakDuration,
        };
      }
    }

    return { needed: false, reason: '', duration: 0 };
  }, [workDuration, breakSettings]);

  // Update work duration every minute
  useEffect(() => {
    if (!currentSession || isOnBreak) return;

    const interval = setInterval(() => {
      setWorkDuration(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentSession, isOnBreak]);

  // Load current session on mount
  useEffect(() => {
    const saved = localStorage.getItem('currentSession');
    if (saved) {
      try {
        const session: WorkSession = JSON.parse(saved);
        // Convert date strings back to Date objects
        session.startTime = new Date(session.startTime);
        session.breaks = session.breaks.map(b => ({
          ...b,
          startTime: new Date(b.startTime),
          endTime: b.endTime ? new Date(b.endTime) : undefined,
        }));
        session.emotionalAlerts = session.emotionalAlerts.map(a => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }));

        setCurrentSession(session);

        // Calculate current work duration
        const now = Date.now();
        const start = session.startTime.getTime();
        const breakTime = session.breaks.reduce((total, b) => {
          if (b.endTime) {
            return total + (b.endTime.getTime() - b.startTime.getTime());
          }
          return total;
        }, 0);

        setWorkDuration(Math.floor((now - start - breakTime) / (1000 * 60)));
      } catch (error) {
        console.error('Failed to load current session:', error);
      }
    }
  }, []);

  return {
    // State
    currentSession,
    isOnBreak,
    currentBreak,
    workDuration,
    breakSettings,

    // Actions
    startWorkSession,
    endWorkSession,
    startBreak,
    endBreak,
    recordEmotionalAlert,
    shouldTakeBreak,
    saveSettings,

    // Computed
    workHours: workDuration / 60,
    totalBreakTime: currentSession?.breaks.reduce((total, b) => total + b.duration, 0) || 0,
    emotionalAlertsToday: currentSession?.emotionalAlerts.length || 0,
  };
};