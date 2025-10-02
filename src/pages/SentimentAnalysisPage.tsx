import React from 'react';
import { SentimentAnalysis } from '@/components/SentimentAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

const SentimentAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Sentiment Analysis</h1>
              <p className="text-sm text-muted-foreground">Real-time facial expression and emotion detection</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-600">
                <Brain className="w-3 h-3 mr-1" />
                AI Analysis Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Analysis Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5" />
                  Analysis Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">1,247</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Analyses</div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Rate</span>
                    <span className="font-medium text-green-500">96.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span className="font-medium text-blue-500">120ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Sessions</span>
                    <span className="font-medium text-purple-500">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emotion Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smile className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Happy</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-1" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Meh className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Neutral</span>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-1" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Frown className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Sad</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Sentiment Analysis */}
          <div className="lg:col-span-3">
            <SentimentAnalysis />
          </div>
        </div>

        {/* Historical Data */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Sentiment Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Smile className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500 mb-1">Positive</div>
                  <div className="text-sm text-muted-foreground">45% of detections</div>
                  <div className="text-xs text-green-500 mt-1">↗️ +5.2% this week</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Meh className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-500 mb-1">Neutral</div>
                  <div className="text-sm text-muted-foreground">35% of detections</div>
                  <div className="text-xs text-yellow-500 mt-1">→ Stable</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Frown className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-red-500 mb-1">Negative</div>
                  <div className="text-sm text-muted-foreground">20% of detections</div>
                  <div className="text-xs text-green-500 mt-1">↘️ -2.1% this week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SentimentAnalysisPage;