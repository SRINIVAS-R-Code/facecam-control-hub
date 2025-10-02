import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Thermometer,
  Zap,
  AlertTriangle
} from 'lucide-react';

const SystemHealth = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">System Health Monitor</h1>
              <p className="text-sm text-muted-foreground">Real-time system diagnostics and health monitoring</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
                <Shield className="w-3 h-3 mr-1" />
                All Systems Optimal
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <span className="text-sm font-medium">68°C</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Disk I/O</span>
                    </div>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network & Connectivity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                Network & Connectivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Network Status</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">Connected</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Latency</span>
                  <span className="text-sm font-medium text-green-500">12ms</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Bandwidth</span>
                  <span className="text-sm font-medium">100 Mbps</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Packets Lost</span>
                  <span className="text-sm font-medium text-green-500">0.01%</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Connected Devices</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Camera Module</span>
                    <Badge variant="outline" className="text-xs text-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>AI Processor</span>
                    <Badge variant="outline" className="text-xs text-green-500">Online</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Storage Unit</span>
                    <Badge variant="outline" className="text-xs text-green-500">Online</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Logs & Alerts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">High CPU usage detected</div>
                    <div className="text-xs text-muted-foreground">2 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <Wifi className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Network latency spike</div>
                    <div className="text-xs text-muted-foreground">5 minutes ago</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Badge variant="secondary">2 Active Alerts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <span className="font-medium">System startup completed</span>
                    <span className="text-muted-foreground ml-2">10:30 AM</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <span className="font-medium">Face detection model loaded</span>
                    <span className="text-muted-foreground ml-2">10:31 AM</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <span className="font-medium">AI assistant initialized</span>
                    <span className="text-muted-foreground ml-2">10:32 AM</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <span className="font-medium">Performance optimization applied</span>
                    <span className="text-muted-foreground ml-2">10:35 AM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SystemHealth;