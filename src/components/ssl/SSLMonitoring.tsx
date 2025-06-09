
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Shield, AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';

export const SSLMonitoring: React.FC = () => {
  // Mock SSL data
  const sslCertificates = [
    {
      id: '1',
      domain: 'example.com',
      issuer: 'Let\'s Encrypt',
      start_date: '2024-01-01',
      end_date: '2024-04-01',
      days_remaining: 45,
      last_checked: '2024-01-09 14:30:00',
    },
    {
      id: '2',
      domain: 'test.org',
      issuer: 'DigiCert',
      start_date: '2023-12-01',
      end_date: '2024-01-15',
      days_remaining: 6,
      last_checked: '2024-01-09 14:25:00',
    },
    {
      id: '3',
      domain: 'demo.com',
      issuer: 'CloudFlare',
      start_date: '2023-11-15',
      end_date: '2024-11-15',
      days_remaining: 310,
      last_checked: '2024-01-09 14:20:00',
    },
  ];

  const getStatusBadge = (daysRemaining: number) => {
    if (daysRemaining <= 7) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (daysRemaining <= 30) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Warning</Badge>;
    } else {
      return <Badge variant="default">Valid</Badge>;
    }
  };

  const getStatusIcon = (daysRemaining: number) => {
    if (daysRemaining <= 7) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    } else if (daysRemaining <= 30) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const criticalCount = sslCertificates.filter(cert => cert.days_remaining <= 7).length;
  const warningCount = sslCertificates.filter(cert => cert.days_remaining <= 30 && cert.days_remaining > 7).length;
  const validCount = sslCertificates.filter(cert => cert.days_remaining > 30).length;

  return (
    <div className="space-y-6">
      {/* SSL Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Certificates</p>
              <p className="text-2xl font-bold">{sslCertificates.length}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valid</p>
              <p className="text-2xl font-bold text-green-600">{validCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Warning</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* SSL Certificates List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">SSL Certificates</h3>
        <div className="space-y-4">
          {sslCertificates.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(cert.days_remaining)}
                <div>
                  <h4 className="font-medium">{cert.domain}</h4>
                  <p className="text-sm text-muted-foreground">
                    Issued by {cert.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last checked {new Date(cert.last_checked).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm font-medium">Days Remaining</p>
                  <p className={`text-lg font-bold ${
                    cert.days_remaining <= 7 ? 'text-red-600' :
                    cert.days_remaining <= 30 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {cert.days_remaining}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium">Expires</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(cert.end_date).toLocaleDateString()}
                  </p>
                </div>
                
                {getStatusBadge(cert.days_remaining)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SSL Certificate Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Certificate Timeline</h3>
        <div className="space-y-4">
          {sslCertificates.map((cert) => (
            <div key={cert.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{cert.domain}</h4>
                {getStatusBadge(cert.days_remaining)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-muted-foreground">
                      {new Date(cert.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-muted-foreground">
                      {new Date(cert.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Last Checked</p>
                    <p className="text-muted-foreground">
                      {new Date(cert.last_checked).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm">
                  <span className="font-medium">Issuer:</span> {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
