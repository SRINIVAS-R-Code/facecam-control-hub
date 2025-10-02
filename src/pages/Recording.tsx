import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Video,
  Play,
  Pause,
  Square,
  Download,
  HardDrive,
  Clock,
  FileVideo,
  Settings
} from 'lucide-react';

const Recording = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Recording Management</h1>
              <p className="text-sm text-muted-foreground">Video recording and storage management system</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="animate-pulse">
                <Video className="w-3 h-3 mr-1" />
                RECORDING
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recording Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Recording Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                </div>
                <Button variant="destructive" className="w-full">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Recording Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resolution</label>
                  <div className="text-sm">1920x1080 (FHD)</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Frame Rate</label>
                  <div className="text-sm">30 FPS</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality</label>
                  <div className="text-sm">High</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <div className="text-sm">MP4 (H.264)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recording Stats & Storage */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Current Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">00:12:34</div>
                    <div className="text-sm text-muted-foreground">Recording Duration</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">2.3GB</div>
                      <div className="text-xs text-muted-foreground">File Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">28.5</div>
                      <div className="text-xs text-muted-foreground">FPS</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    Storage Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used Space</span>
                      <span>23.4 GB</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <div className="text-xs text-muted-foreground">23% of 100GB used</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Available</span>
                      <span>76.6 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recordings</span>
                      <span>47 files</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Retention</span>
                      <span>30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileVideo className="w-5 h-5" />
                  Recent Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileVideo className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">recording_2024-01-15_14-30.mp4</div>
                        <div className="text-xs text-muted-foreground">Duration: 5:23 | Size: 1.2GB</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileVideo className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">recording_2024-01-15_12-15.mp4</div>
                        <div className="text-xs text-muted-foreground">Duration: 8:47 | Size: 2.1GB</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileVideo className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">recording_2024-01-15_09-45.mp4</div>
                        <div className="text-xs text-muted-foreground">Duration: 12:33 | Size: 3.4GB</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
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

export default Recording;