import { useSocket } from '@/hooks/useSocket';
import { SOCKET_URL } from '@/lib/constants';
import { ConsoleLog } from '@/types/websocket';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function Console() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const { toast } = useToast();

  const { isConnected, emit, on, off } = useSocket({
    uri: SOCKET_URL,
    onConnect: () => {
      toast({
        title: 'Connected to server',
        description: 'Successfully connected to the Minecraft server.',
      });
    },
    onDisconnect: () => {
      toast({
        title: 'Disconnected from server',
        description: 'Lost connection to the Minecraft server.',
        variant: 'destructive',
      });
    },
    onError: (error) => {
      toast({
        title: 'Connection error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    const handleConsoleLog = (log: ConsoleLog) => {
      setLogs(prevLogs => [...prevLogs, log]);
    };

    const handleCommandResponse = (response: { success: boolean; message: string }) => {
      toast({
        title: response.success ? 'Command executed' : 'Command failed',
        description: response.message,
        variant: response.success ? 'default' : 'destructive',
      });
    };

    on('console:log', handleConsoleLog);
    on('command:response', handleCommandResponse);

    return () => {
      off('console:log', handleConsoleLog);
      off('command:response', handleCommandResponse);
    };
  }, [on, off, toast]);

  const handleSendCommand = () => {
    if (command.trim()) {
      emit('command:execute', command);
      setCommand('');
    }
  };

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
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Server Console</CardTitle>
          <div className={`h-2 w-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`} />
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendCommand()}
              placeholder="Enter command..."
              className="font-mono"
              disabled={!isConnected}
            />
            <Button onClick={handleSendCommand} disabled={!isConnected}>
              <SendIcon className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}