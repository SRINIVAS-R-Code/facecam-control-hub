import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Cpu,
  Camera,
  Shield,
  Bell,
  Database,
  User,
  Save,
  RotateCcw
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">System Settings</h1>
              <p className="text-sm text-muted-foreground">Configure and customize your Face Control Hub</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Camera Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Resolution</span>
                  <Badge variant="outline">1920x1080 (FHD)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Frame Rate</span>
                  <Badge variant="outline">30 FPS</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Quality</span>
                  <Badge variant="outline">High</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Auto-focus</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                AI & Detection Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Detection Model</span>
                  <Badge variant="outline">SSD MobileNet V2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Threshold</span>
                  <Badge variant="outline">0.7</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Processing Mode</span>
                  <Badge variant="outline" className="text-blue-500 border-blue-500">Real-time</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sentiment Analysis</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Encryption</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">AES-256</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Access Control</span>
                  <Badge variant="outline" className="text-blue-500 border-blue-500">Role-based</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Audit Logging</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Auto Backup</span>
                  <Badge variant="outline" className="text-orange-500 border-orange-500">Daily</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Face Detection Alerts</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">Push + Email</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">System Warnings</span>
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">Dashboard Only</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Performance Reports</span>
                  <Badge variant="outline" className="text-blue-500 border-blue-500">Weekly</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Security Events</span>
                  <Badge variant="outline" className="text-red-500 border-red-500">Real-time</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage & System Settings */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Storage & System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Storage Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Retention Period</span>
                      <span className="font-medium">30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Cleanup</span>
                      <span className="font-medium text-green-500">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compression</span>
                      <span className="font-medium text-blue-500">High</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CPU Priority</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Limit</span>
                      <span className="font-medium">2GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thread Count</span>
                      <span className="font-medium">4</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">User Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Theme</span>
                      <span className="font-medium">System</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language</span>
                      <span className="font-medium">English</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timezone</span>
                      <span className="font-medium">UTC+5:30</span>
                    </div>
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

export default Settings;