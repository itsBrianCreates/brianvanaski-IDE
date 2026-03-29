import { nameMap } from '../fileTree';

export default function StatusBar({ activeFile, theme, onToggleTheme }) {
  const filePath = activeFile ? (nameMap[activeFile] || activeFile + '.md') : 'No file open';

  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-file">{filePath}</span>
      </div>
      <div className="status-right">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? '\u2600' : '\u263D'}
        </button>
        <span className="status-built">Built with Claude Code</span>
      </div>
    </div>
  );
}
