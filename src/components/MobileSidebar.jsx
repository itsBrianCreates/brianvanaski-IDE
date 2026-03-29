import FileTree from './FileTree';

export default function MobileSidebar({ isOpen, onClose, activeFile, onFileSelect }) {
  const handleFileSelect = (path) => {
    onFileSelect(path);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="mobile-backdrop" onClick={onClose} />}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <span>EXPLORER</span>
          <button className="mobile-close" onClick={onClose} aria-label="Close sidebar">
            &times;
          </button>
        </div>
        <FileTree activeFile={activeFile} onFileSelect={handleFileSelect} />
      </div>
    </>
  );
}
