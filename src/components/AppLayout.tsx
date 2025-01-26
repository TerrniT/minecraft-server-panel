import { BellIcon, CpuIcon, GaugeIcon, HardDriveIcon, LayoutDashboardIcon, LayersIcon as PlayersIcon, ServerIcon, TerminalIcon, UsersIcon } from 'lucide-react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Players } from '@/pages/Players';
import { Console } from '@/pages/Console';
import { Performance } from '@/pages/Performance';
import { Backups } from '@/pages/Backups';

const navigation = [
  { id: 'dashboard', path: '/', icon: LayoutDashboardIcon, translationKey: 'common.dashboard' },
  { id: 'players', path: '/players', icon: UsersIcon, translationKey: 'common.players' },
  { id: 'console', path: '/console', icon: TerminalIcon, translationKey: 'common.console' },
  { id: 'performance', path: '/performance', icon: GaugeIcon, translationKey: 'common.performance' },
  { id: 'backups', path: '/backups', icon: HardDriveIcon, translationKey: 'common.backups' },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getTitle = () => {
    const currentRoute = navigation.find(item => 
      item.path === (location.pathname === '/' ? '/' : location.pathname)
    );
    return currentRoute ? t(currentRoute.translationKey) : t('common.dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <ServerIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-xl font-bold text-foreground">MC Admin</h1>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant={location.pathname === item.path ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2 text-foreground hover:text-foreground bg-secondary',
                location.pathname === item.path ? 'bg-secondary hover:bg-secondary/10 text-secondary-foreground' : 'hover:bg-secondary/50'
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {t(item.translationKey)}
            </Button>
          ))}
        </nav>
      </div>

      <Layout title={getTitle()}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/console" element={<Console />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/backups" element={<Backups />} />
        </Routes>
      </Layout>
    </div>
  );
}