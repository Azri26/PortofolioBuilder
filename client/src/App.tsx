import { Router, Route, Switch } from 'wouter';
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1">
        <Router>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/projects/:id" component={ProjectDetailPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route>
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
                <p className="text-muted-foreground">Halaman yang Anda cari tidak tersedia.</p>
              </div>
            </Route>
          </Switch>
        </Router>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Portfolio Data Science. Semua hak dilindungi.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Dibuat dengan ❤️ menggunakan React & Express.js
            </p>
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;