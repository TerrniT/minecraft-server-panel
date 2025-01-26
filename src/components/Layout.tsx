import { BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="pl-64 w-full">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-2 w-fit">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">{t('common.serverOnline')}</span>
            </div>
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="outline" size="icon">
              <BellIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 w-full">
        {children}
      </main>
    </div>
  );
}