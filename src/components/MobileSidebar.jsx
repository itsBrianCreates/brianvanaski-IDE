import FileTree from './FileTree';
import AppPromo from './AppPromo';

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
          <span>BRIANVANASKI.COM</span>
          <button className="mobile-close" onClick={onClose} aria-label="Close sidebar">
            &times;
          </button>
        </div>
        <FileTree activeFile={activeFile} onFileSelect={handleFileSelect} />
        <AppPromo />
      </div>
    </>
  );
}
