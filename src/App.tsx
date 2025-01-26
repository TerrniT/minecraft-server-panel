import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AppLayout } from '@/components/AppLayout';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;