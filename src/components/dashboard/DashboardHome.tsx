
import React from 'react';
import { Card } from '../ui/card';
import { Globe, Activity, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const DashboardHome: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalDomains: 12,
    activeDomains: 10,
    sslIssues: 2,
    downtimeDomains: 1
  };

  const recentActivity = [
    { id: '1', domain: 'example.com', status: 'UP', time: '2 minutes ago', type: 'uptime' },
    { id: '2', domain: 'test.org', status: 'SSL_EXPIRING', time: '5 minutes ago', type: 'ssl' },
    { id: '3', domain: 'mysite.net', status: 'DOWN', time: '10 minutes ago', type: 'uptime' },
    { id: '4', domain: 'demo.com', status: 'UP', time: '15 minutes ago', type: 'uptime' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UP':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'DOWN':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'SSL_EXPIRING':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome to your Dashboard</h2>
        <p className="text-muted-foreground">Monitor your domains, SSL certificates, and uptime status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Domains</p>
              <p className="text-2xl font-bold">{stats.totalDomains}</p>
            </div>
            <Globe className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Domains</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeDomains}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">SSL Issues</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.sslIssues}</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Down Domains</p>
              <p className="text-2xl font-bold text-red-600">{stats.downtimeDomains}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(activity.status)}
                <div>
                  <p className="font-medium">{activity.domain}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {activity.status.replace('_', ' ').toLowerCase()} • {activity.type}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <Globe className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium">Add Domain</h4>
            <p className="text-sm text-muted-foreground">Monitor a new domain</p>
          </div>
          <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <Activity className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium">Check Uptime</h4>
            <p className="text-sm text-muted-foreground">View uptime statistics</p>
          </div>
          <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <Shield className="h-6 w-6 text-yellow-500 mb-2" />
            <h4 className="font-medium">SSL Status</h4>
            <p className="text-sm text-muted-foreground">Check SSL certificates</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
