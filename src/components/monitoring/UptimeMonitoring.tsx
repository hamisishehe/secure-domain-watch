
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

export const UptimeMonitoring: React.FC = () => {
  // Mock uptime data
  const uptimeEvents = [
    {
      id: '1',
      domain: 'example.com',
      status: 'UP' as const,
      response_time: 120,
      checked_at: '2024-01-09 14:30:00',
    },
    {
      id: '2',
      domain: 'test.org',
      status: 'DOWN' as const,
      response_time: null,
      checked_at: '2024-01-09 14:29:00',
    },
    {
      id: '3',
      domain: 'example.com',
      status: 'UP' as const,
      response_time: 95,
      checked_at: '2024-01-09 14:25:00',
    },
    {
      id: '4',
      domain: 'demo.com',
      status: 'UP' as const,
      response_time: 200,
      checked_at: '2024-01-09 14:20:00',
    },
  ];

  const domainStats = [
    {
      domain: 'example.com',
      uptime: 99.9,
      avgResponseTime: 108,
      lastCheck: '2 minutes ago',
      status: 'UP' as const,
    },
    {
      domain: 'test.org',
      uptime: 85.2,
      avgResponseTime: 0,
      lastCheck: '3 minutes ago',
      status: 'DOWN' as const,
    },
    {
      domain: 'demo.com',
      uptime: 98.7,
      avgResponseTime: 185,
      lastCheck: '5 minutes ago',
      status: 'UP' as const,
    },
  ];

  const getStatusIcon = (status: 'UP' | 'DOWN') => {
    return status === 'UP' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-600';
    if (uptime >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Uptime</p>
              <p className="text-2xl font-bold text-green-600">97.9%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold">164ms</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Incidents Today</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Domain Status Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Domain Status Overview</h3>
        <div className="space-y-4">
          {domainStats.map((domain) => (
            <div key={domain.domain} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(domain.status)}
                <div>
                  <h4 className="font-medium">{domain.domain}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last checked {domain.lastCheck}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <p className="font-medium">Uptime</p>
                  <p className={`font-semibold ${getUptimeColor(domain.uptime)}`}>
                    {domain.uptime}%
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium">Response Time</p>
                  <p className="font-semibold">
                    {domain.avgResponseTime > 0 ? `${domain.avgResponseTime}ms` : 'N/A'}
                  </p>
                </div>
                
                <Badge variant={domain.status === 'UP' ? 'default' : 'destructive'}>
                  {domain.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Events */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Uptime Events</h3>
        <div className="space-y-3">
          {uptimeEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(event.status)}
                <div>
                  <p className="font-medium">{event.domain}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.checked_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant={event.status === 'UP' ? 'default' : 'destructive'}>
                  {event.status}
                </Badge>
                {event.response_time && (
                  <span className="text-muted-foreground">
                    {event.response_time}ms
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
