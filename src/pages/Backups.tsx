import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DownloadIcon, HardDriveIcon, RotateCwIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

const backups = [
  { id: 1, name: 'world-2024-01-20-12-00', size: '2.5 GB', date: '2024-01-20 12:00', type: 'Auto' },
  { id: 2, name: 'world-2024-01-20-00-00', size: '2.4 GB', date: '2024-01-20 00:00', type: 'Auto' },
  { id: 3, name: 'world-2024-01-19-12-00', size: '2.3 GB', date: '2024-01-19 12:00', type: 'Manual' },
];

export function Backups() {
  const [isCreating, setIsCreating] = useState(false);
  const [backupName, setBackupName] = useState('');
  const [includePlugins, setIncludePlugins] = useState(true);
  const [includeConfigs, setIncludeConfigs] = useState(true);

  const handleCreateBackup = () => {
    // Here you would implement the backup creation logic
    setIsCreating(true);
    // Simulate backup creation
    setTimeout(() => {
      setIsCreating(false);
      // Reset form
      setBackupName('');
      setIncludePlugins(true);
      setIncludeConfigs(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Card className="flex-1 mr-6 min-w-[80%]">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm *:w-fit">
                <span className="text-muted-foreground">7.2 GB used</span>
                <span className="text-muted-foreground">20 GB total</span>
              </div>
              <Progress value={36} />
            </div>
          </CardContent>
        </Card>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <HardDriveIcon className="h-4 w-4" />
              Create Backup
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Backup</DialogTitle>
              <DialogDescription>
                Create a new backup of your Minecraft server. This process may take several minutes depending on the world size.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Backup Name</Label>
                <Input
                  id="name"
                  placeholder="Enter backup name (optional)"
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="plugins">Include Plugins</Label>
                <Switch
                  id="plugins"
                  checked={includePlugins}
                  onCheckedChange={setIncludePlugins}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="configs">Include Config Files</Label>
                <Switch
                  id="configs"
                  checked={includeConfigs}
                  onCheckedChange={setIncludeConfigs}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>Cancel</Button>
              <Button onClick={handleCreateBackup} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <RotateCwIcon className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Backup'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.name}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>{backup.date}</TableCell>
                  <TableCell>{backup.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RotateCwIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <TrashIcon className="h-4 w-4" />
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