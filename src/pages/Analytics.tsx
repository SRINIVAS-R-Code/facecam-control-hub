import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Calendar,
  Activity,
  Target
} from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-600">
                <BarChart3 className="w-3 h-3 mr-1" />
                Real-time Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-green-500/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-1">1,247</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Detections</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-blue-500/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-500 mb-1">98.5%</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">System Uptime</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">+2.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-purple-500/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-500 mb-1">94.2%</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Accuracy Rate</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">+1.8%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-orange-500/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-orange-500 mb-1">28.5</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Avg FPS</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-500">-0.3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Detection Rate (Last 7 days)</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="h-32 bg-muted/30 rounded-lg flex items-end justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Chart visualization would appear here</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>System Uptime (Last 30 days)</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="h-32 bg-muted/30 rounded-lg flex items-end justify-center">
                    <div className="text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Uptime chart would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Peak Usage Hours</span>
                    <span className="font-medium">9AM - 5PM</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{day}</div>
                        <div className={`h-8 rounded ${index < 5 ? 'bg-primary/60' : 'bg-muted'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Top Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Faces/Hour</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Longest Session</span>
                      <span className="font-medium">8h 32m</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Sessions</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Data Processed</span>
                      <span className="font-medium">2.3 TB</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Detailed Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">Weekly</div>
                  <div className="text-sm text-muted-foreground mb-3">Detection Summary</div>
                  <Badge variant="outline">View Report</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">Monthly</div>
                  <div className="text-sm text-muted-foreground mb-3">Performance Analysis</div>
                  <Badge variant="outline">View Report</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">Annual</div>
                  <div className="text-sm text-muted-foreground mb-3">Trends & Insights</div>
                  <Badge variant="outline">View Report</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;