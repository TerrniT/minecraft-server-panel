import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';

export function Console() {
  const [command, setCommand] = useState('');

  const logs = [
    { timestamp: '2024-01-20 12:30:45', type: 'info', message: 'Server started' },
    { timestamp: '2024-01-20 12:31:00', type: 'info', message: 'Loading world...' },
    { timestamp: '2024-01-20 12:31:05', type: 'warn', message: 'Player tried to access restricted area' },
    { timestamp: '2024-01-20 12:31:10', type: 'error', message: 'Failed to load chunk at 64, -128' },
    { timestamp: '2024-01-20 12:31:15', type: 'info', message: 'Player Steve joined the game' },
  ];

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'warn':
        return 'text-yellow-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[500px] w-full rounded-md border bg-muted p-4">
            {logs.map((log, index) => (
              <div key={index} className="mb-2 font-mono text-sm">
                <span className="text-muted-foreground">[{log.timestamp}]</span>{' '}
                <span className={getLogColor(log.type)}>[{log.type.toUpperCase()}]</span>{' '}
                <span>{log.message}</span>
              </div>
            ))}
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command..."
              className="font-mono"
            />
            <Button>
              <SendIcon className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}