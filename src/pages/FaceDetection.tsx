import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Eye,
  Settings,
  Camera,
  Target,
  Zap,
  Shield,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const FaceDetection = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Face Detection</h1>
              <p className="text-sm text-muted-foreground">Advanced facial recognition and detection management</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
                <Eye className="w-3 h-3 mr-1" />
                Active Detection
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detection Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Detection Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Detection
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset System
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Detection Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sensitivity Level</label>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-muted-foreground">High (85%)</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Face Size</label>
                  <div className="text-sm">64x64 pixels</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Detection Model</label>
                  <div className="text-sm">SSD MobileNet V2</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confidence Threshold</label>
                  <div className="text-sm">0.7</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detection Stats & Live Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Live Detection Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Camera feed would display here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Detection Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">1</div>
                      <div className="text-xs text-muted-foreground">Active Cameras</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">3</div>
                      <div className="text-xs text-muted-foreground">Faces Detected</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Detection Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Confidence</span>
                      <span className="font-medium">87.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Processing FPS</span>
                      <span className="font-medium">28.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Detection History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <div className="text-sm font-medium">Face detected - Confidence: 92%</div>
                        <div className="text-xs text-muted-foreground">2 minutes ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Person A</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div>
                        <div className="text-sm font-medium">Face detected - Confidence: 89%</div>
                        <div className="text-xs text-muted-foreground">5 minutes ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Person B</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div>
                        <div className="text-sm font-medium">Detection paused</div>
                        <div className="text-xs text-muted-foreground">8 minutes ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">System</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaceDetection;