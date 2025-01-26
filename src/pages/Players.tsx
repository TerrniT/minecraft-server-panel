import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BanIcon, MessageSquareIcon } from 'lucide-react';

const players = [
  { id: 1, name: 'Steve', health: 20, level: 30, ping: 23, playTime: '12h 30m' },
  { id: 2, name: 'Alex', health: 15, level: 25, ping: 45, playTime: '5h 45m' },
  { id: 3, name: 'Notch', health: 20, level: 50, ping: 12, playTime: '2d 5h' },
];

export function Players() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Online Players</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Ping</TableHead>
                <TableHead>Play Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://mc-heads.net/avatar/${player.name}`} />
                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    {player.name}
                  </TableCell>
                  <TableCell>{player.health}/20</TableCell>
                  <TableCell>Lvl {player.level}</TableCell>
                  <TableCell>{player.ping}ms</TableCell>
                  <TableCell>{player.playTime}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <MessageSquareIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <BanIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}