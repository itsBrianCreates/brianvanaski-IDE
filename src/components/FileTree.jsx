import { useState } from 'react';
import { FolderClosed, FolderOpen, FileText, Share } from 'lucide-react';
import { fileTree as fileTreeData } from '../fileTree';

function FileItem({ item, depth, activeFile, onFileSelect, onShare }) {
  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#/${item.path}`;
    navigator.clipboard.writeText(url).then(() => {
      onShare(url);
    });
  };

  return (
    <button
      className={`file-tree-item file-item ${activeFile === item.path ? 'active' : ''}`}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
      onClick={() => onFileSelect(item.path)}
      title={item.name}
    >
      <FileText size={16} className="file-icon-lucide" />
      <span className="file-name">{item.name}</span>
      <span className="file-share" onClick={handleShare} title="Copy link">
        <Share size={14} />
      </span>
    </button>
  );
}

function FolderItem({ item, depth, activeFile, onFileSelect, onShare, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="file-tree-folder">
      <button
        className="file-tree-item folder-toggle"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <FolderOpen size={16} className="folder-icon-lucide" />
        ) : (
          <FolderClosed size={16} className="folder-icon-lucide" />
        )}
        <span className="folder-name">{item.name}</span>
      </button>
      {open && (
        <div className="folder-children" style={{ '--guide-left': `${19 + depth * 16}px` }}>
          {item.children.map((child) =>
            child.type === 'folder' ? (
              <FolderItem
                key={child.name}
                item={child}
                depth={depth + 1}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
                onShare={onShare}
                defaultOpen={false}
              />
            ) : (
              <FileItem
                key={child.path}
                item={child}
                depth={depth + 1}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
                onShare={onShare}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

const expandedByDefault = new Set(['portfolio', 'experiments']);

export default function FileTree({ activeFile, onFileSelect, onShare }) {
  return (
    <nav className="file-tree">
      <div className="file-tree-header">BRIANVANASKI.COM</div>
      <div className="file-tree-list">
        {fileTreeData.map((item) =>
          item.type === 'folder' ? (
            <FolderItem
              key={item.name}
              item={item}
              depth={0}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
              onShare={onShare}
              defaultOpen={expandedByDefault.has(item.name)}
            />
          ) : (
            <FileItem
              key={item.path}
              item={item}
              depth={0}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
              onShare={onShare}
            />
          )
        )}
      </div>
    </nav>
  );
}
