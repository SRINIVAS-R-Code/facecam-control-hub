import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Smile,
  Frown,
  Meh,
  Angry,
  Heart,
  Brain
} from 'lucide-react';

interface SentimentData {
  emotion: string;
  confidence: number;
  icon: React.ReactNode;
  color: string;
}

export const SentimentAnalysis = () => {
  // Mock sentiment data - in real app this would come from face detection
  const sentiments: SentimentData[] = [
    { emotion: 'Happy', confidence: 75, icon: <Smile className="w-4 h-4" />, color: 'text-green-500' },
    { emotion: 'Neutral', confidence: 60, icon: <Meh className="w-4 h-4" />, color: 'text-yellow-500' },
    { emotion: 'Sad', confidence: 25, icon: <Frown className="w-4 h-4" />, color: 'text-blue-500' },
    { emotion: 'Angry', confidence: 15, icon: <Angry className="w-4 h-4" />, color: 'text-red-500' },
    { emotion: 'Surprised', confidence: 40, icon: <Heart className="w-4 h-4" />, color: 'text-purple-500' },
  ];

  const dominantEmotion = sentiments.reduce((prev, current) =>
    prev.confidence > current.confidence ? prev : current
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="w-5 h-5" />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl mb-2">{dominantEmotion.icon}</div>
          <Badge variant="outline" className="text-sm">
            Dominant: {dominantEmotion.emotion}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">
            Confidence: {dominantEmotion.confidence}%
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Emotion Breakdown</h4>
          {sentiments.map((sentiment) => (
            <div key={sentiment.emotion} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={sentiment.color}>{sentiment.icon}</span>
                  <span>{sentiment.emotion}</span>
                </div>
                <span className="text-muted-foreground">{sentiment.confidence}%</span>
              </div>
              <Progress value={sentiment.confidence} className="h-2" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Real-time facial expression analysis</p>
            <p>• Confidence scores updated every second</p>
            <p>• Supports multiple emotion detection</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};