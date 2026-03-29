import { useEffect } from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message, url, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <div className="toast-icon">
        <Check size={16} />
      </div>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        {url && <span className="toast-url">{url}</span>}
      </div>
    </div>
  );
}
