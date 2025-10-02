import React from 'react';
import { AIChat } from '@/components/AIChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Bot, Brain, Zap } from 'lucide-react';

const AIChatPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Intelligent conversational interface for system management</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-600">
                <Bot className="w-3 h-3 mr-1" />
                AI Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Features Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Conversational AI</div>
                      <div className="text-xs text-muted-foreground">Natural language processing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-lg">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">System Analysis</div>
                      <div className="text-xs text-muted-foreground">Performance insights</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg">
                    <Zap className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Smart Automation</div>
                      <div className="text-xs text-muted-foreground">Automated responses</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors">
                    "Show system status"
                  </div>
                  <div className="text-sm p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors">
                    "Start face detection"
                  </div>
                  <div className="text-sm p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors">
                    "Check performance"
                  </div>
                  <div className="text-sm p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors">
                    "Generate report"
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Interface */}
          <div className="lg:col-span-3">
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChatPage;