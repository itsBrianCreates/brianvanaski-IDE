export default function TabBar({ openTabs, activeFile, onTabSelect, onTabClose }) {
  // Derive display name from path
  const getFileName = (path) => {
    const parts = path.split('/');
    const base = parts[parts.length - 1];
    return base + '.md';
  };

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
