import { Menu } from 'lucide-react';
import { nameMap } from '../fileTree';

export default function TabBar({ openTabs, activeFile, onTabSelect, onTabClose, onMenuOpen }) {
  const getFileName = (path) => nameMap[path] || path + '.md';

  return (
    <div className="tab-bar">
      <button className="mobile-hamburger" onClick={onMenuOpen} aria-label="Open sidebar">
        <Menu size={18} />
      </button>
      {openTabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${activeFile === tab ? 'active' : ''}`}
          onClick={() => onTabSelect(tab)}
        >
          <span className="tab-name">{getFileName(tab)}</span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab);
            }}
            aria-label={`Close ${getFileName(tab)}`}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
