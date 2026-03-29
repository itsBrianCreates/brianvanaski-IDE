import { nameMap } from '../fileTree';

export default function TabBar({ openTabs, activeFile, onTabSelect, onTabClose }) {
  const getFileName = (path) => nameMap[path] || path + '.md';

  return (
    <div className="tab-bar">
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
