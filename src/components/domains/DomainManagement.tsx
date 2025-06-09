
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { Plus, Globe, ExternalLink, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Domain } from '../../types';

export const DomainManagement: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: '1',
      name: 'example.com',
      url: 'https://example.com',
      user_id: '1',
      created_at: '2024-01-01',
    },
    {
      id: '2',
      name: 'test.org',
      url: 'https://test.org',
      user_id: '1',
      created_at: '2024-01-02',
    },
  ]);

  const [newDomain, setNewDomain] = useState({ name: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDomain.name || !newDomain.url) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const domain: Domain = {
      id: Date.now().toString(),
      name: newDomain.name,
      url: newDomain.url,
      user_id: '1',
      created_at: new Date().toISOString(),
    };

    setDomains([...domains, domain]);
    setNewDomain({ name: '', url: '' });
    setIsAdding(false);

    toast({
      title: "Domain added",
      description: `${newDomain.name} has been added to monitoring`,
    });
  };

  const handleDeleteDomain = (id: string) => {
    setDomains(domains.filter(domain => domain.id !== id));
    toast({
      title: "Domain removed",
      description: "Domain has been removed from monitoring",
    });
  };

  const getRandomStatus = () => {
    const statuses = ['online', 'offline'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="space-y-6">
      {/* Add Domain Form */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add New Domain</h3>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            variant={isAdding ? "secondary" : "default"}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? "Cancel" : "Add Domain"}
          </Button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddDomain} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="domain-name">Domain Name</Label>
                <Input
                  id="domain-name"
                  placeholder="example.com"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domain-url">Full URL</Label>
                <Input
                  id="domain-url"
                  placeholder="https://example.com"
                  value={newDomain.url}
                  onChange={(e) => setNewDomain({ ...newDomain, url: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Add Domain
            </Button>
          </form>
        )}
      </Card>

      {/* Domain List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Domains ({domains.length})</h3>
        
        {domains.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No domains added yet</p>
            <p className="text-sm text-muted-foreground">Add your first domain to start monitoring</p>
          </div>
        ) : (
          <div className="space-y-4">
            {domains.map((domain) => {
              const status = getRandomStatus();
              return (
                <div key={domain.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{domain.name}</h4>
                      <p className="text-sm text-muted-foreground">{domain.url}</p>
                      <p className="text-xs text-muted-foreground">
                        Added {new Date(domain.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant={status === 'online' ? 'default' : 'destructive'}>
                      {status === 'online' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {status}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(domain.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDomain(domain.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
