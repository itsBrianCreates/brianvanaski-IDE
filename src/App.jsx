import { useState, useEffect, useCallback } from 'react';
import FileTree from './components/FileTree';
import TabBar from './components/TabBar';
import ContentPanel from './components/ContentPanel';
import StatusBar from './components/StatusBar';
import MobileSidebar from './components/MobileSidebar';
import Toast from './components/Toast';
import AppPromo from './components/AppPromo';
import './App.css';

function getFileFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return hash || 'home';
}

function App() {
  const [activeFile, setActiveFile] = useState(() => getFileFromHash());
  const [openTabs, setOpenTabs] = useState(() => {
    try {
      const saved = localStorage.getItem('openTabs');
      const tabs = saved ? JSON.parse(saved) : ['home'];
      const initial = getFileFromHash();
      return tabs.includes(initial) ? tabs : [...tabs, initial];
    } catch {
      return ['home'];
    }
  });
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleShare = useCallback((url) => {
    setToast(url);
  }, []);

  // Sync hash to URL when active file changes
  useEffect(() => {
    if (activeFile === null) {
      window.history.pushState(null, '', window.location.pathname);
      return;
    }
    const newHash = activeFile === 'home' ? '' : `#/${activeFile}`;
    if (window.location.hash !== `#/${activeFile}`) {
      window.history.pushState(null, '', newHash || window.location.pathname);
    }
  }, [activeFile]);

  // Listen for back/forward navigation
  useEffect(() => {
    const onHashChange = () => {
      const file = getFileFromHash();
      setActiveFile(file);
      setOpenTabs((prev) => (prev.includes(file) ? prev : [...prev, file]));
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  // Persist openTabs
  useEffect(() => {
    localStorage.setItem('openTabs', JSON.stringify(openTabs));
  }, [openTabs]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply theme class to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleFileSelect = useCallback((path) => {
    setActiveFile(path);
    setOpenTabs((prev) => (prev.includes(path) ? prev : [...prev, path]));
  }, []);

  const handleTabClose = useCallback(
    (tab) => {
      setOpenTabs((prev) => {
        const next = prev.filter((t) => t !== tab);
        if (tab === activeFile) {
          if (next.length === 0) {
            setActiveFile(null);
          } else {
            const closedIndex = prev.indexOf(tab);
            const newActive = next[Math.min(closedIndex, next.length - 1)] || next[0];
            setActiveFile(newActive);
          }
        }
        return next;
      });
    },
    [activeFile]
  );

  const handleNavigate = useCallback(
    (path) => {
      handleFileSelect(path);
    },
    [handleFileSelect]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className={`app-layout ${theme}`}>
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <FileTree activeFile={activeFile} onFileSelect={handleFileSelect} onShare={handleShare} />
        <AppPromo />
      </aside>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFile={activeFile}
        onFileSelect={handleFileSelect}
      />

      {/* Mobile hamburger */}
      <button
        className="mobile-hamburger"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Main content */}
      <main className="main-area">
        <TabBar
          openTabs={openTabs}
          activeFile={activeFile}
          onTabSelect={setActiveFile}
          onTabClose={handleTabClose}
        />
        <ContentPanel activeFile={activeFile} onNavigate={handleNavigate} />
      </main>

      <StatusBar
        activeFile={activeFile}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {toast && (
        <Toast
          message="Link copied to clipboard"
          url={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
