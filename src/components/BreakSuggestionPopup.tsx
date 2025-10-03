import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, Coffee, Heart, Zap } from 'lucide-react';

interface BreakSuggestionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onTakeBreak: () => void;
  reason: string;
  duration: number; // in minutes
  emotion?: string;
  confidence?: number;
  type: 'scheduled' | 'emotional' | 'time-based';
}

export const BreakSuggestionPopup: React.FC<BreakSuggestionPopupProps> = ({
  isOpen,
  onClose,
  onTakeBreak,
  reason,
  duration,
  emotion,
  confidence,
  type,
}) => {
  const [timeLeft, setTimeLeft] = useState(30); // Auto-close in 30 seconds

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'emotional':
        return <Heart className="w-8 h-8 text-red-500" />;
      case 'time-based':
        return <Clock className="w-8 h-8 text-blue-500" />;
      default:
        return <Coffee className="w-8 h-8 text-green-500" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'emotional':
        return 'Emotional Well-being Break';
      case 'time-based':
        return 'Time for a Break!';
      default:
        return 'Break Time Suggestion';
    }
  };

  const getSuggestionMessage = () => {
    switch (type) {
      case 'emotional':
        return `I noticed you're feeling ${emotion}. Taking a short break can help you recharge and return refreshed.`;
      case 'time-based':
        return "You've been working diligently. A quick break will help maintain your productivity and focus.";
      default:
        return "It's time to take a well-deserved break to maintain your well-being.";
    }
  };

  const getActivities = () => {
    const activities = [
      "Take a short walk",
      "Practice deep breathing",
      "Have a healthy snack",
      "Listen to calming music",
      "Do some light stretching",
      "Call a friend or family member",
      "Step outside for fresh air",
      "Practice mindfulness meditation",
    ];

    return activities.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <DialogTitle className="text-xl font-semibold">
                {getTitle()}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Auto-closing in {timeLeft} seconds
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Reason and emotion info */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{reason}</p>
                  {emotion && confidence && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {emotion} detected
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(confidence * 100)}% confidence
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Break details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Suggested Break Duration</span>
            </div>
            <p className="text-2xl font-bold text-primary">{duration} minutes</p>
          </div>

          {/* Suggestion message */}
          <div className="text-sm text-muted-foreground">
            {getSuggestionMessage()}
          </div>

          {/* Suggested activities */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Suggested Activities
            </h4>
            <div className="space-y-1">
              {getActivities().map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onTakeBreak}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Take Break Now
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Continue Working
            </Button>
          </div>

          {/* Progress bar for auto-close */}
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};