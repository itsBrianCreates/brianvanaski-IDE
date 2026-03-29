import { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { contentMap, nameMap } from '../fileTree';

export default function ContentPanel({ activeFile, onNavigate }) {
  const [viewMode, setViewMode] = useState('preview');
  const [fadeKey, setFadeKey] = useState(activeFile);

  useEffect(() => {
    setFadeKey(activeFile);
  }, [activeFile]);

  const content = activeFile
    ? (contentMap[activeFile] || '# File not found\n\nThis content has not been created yet.')
    : '';

  // Build breadcrumb
  const breadcrumb = useMemo(() => {
    if (!activeFile) return '';
    const displayName = nameMap[activeFile] || activeFile + '.md';
    const parts = activeFile.split('/');
    if (parts.length === 1) return displayName;
    return parts.slice(0, -1).join(' / ') + ' / ' + displayName;
  }, [activeFile]);

  // Known paths for internal link detection
  const knownPaths = useMemo(() => new Set(Object.keys(contentMap)), []);

  // Custom link renderer for internal navigation
  const linkRenderer = useCallback(
    ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>;

      let internalPath = null;
      if (href.startsWith('./')) {
        internalPath = href.slice(2);
      } else if (knownPaths.has(href)) {
        internalPath = href;
      }

      if (internalPath) {
        internalPath = internalPath.replace(/\.md$/, '');
        return (
          <a
            href={`#${internalPath}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(internalPath);
            }}
            {...props}
          >
            {children}
          </a>
        );
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    [knownPaths, onNavigate]
  );

  const lines = content.split('\n');

  // Empty state — all tabs closed
  if (!activeFile) {
    return (
      <div className="content-panel">
        <div className="empty-state">
          <pre className="empty-ascii">{`
    ╭──────────────────────────────╮
    │                              │
    │   Nothing to see here...     │
    │                              │
    │   just a designer staring    │
    │   at an empty editor.        │
    │                              │
    │   ← Pick a file over there   │
    │                              │
    ╰──────────────────────────────╯`}</pre>
          <button className="empty-cta" onClick={() => onNavigate('home')}>
            Open README.md
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-panel">
      <div className="content-toolbar">
        <span className="breadcrumb">{breadcrumb}</span>
        <div className="view-toggle">
          <button
            className={viewMode === 'preview' ? 'active' : ''}
            onClick={() => setViewMode('preview')}
          >
            Preview
          </button>
          <button
            className={viewMode === 'code' ? 'active' : ''}
            onClick={() => setViewMode('code')}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className="content-body" key={fadeKey}>
        {viewMode === 'preview' ? (
          <div className="markdown-preview">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                a: linkRenderer,
                img: ({ src, ...props }) => (
                  <img src={src?.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src} {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="code-view">
            <pre>
              <code>
                <table className="code-table">
                  <tbody>
                    {lines.map((line, i) => (
                      <tr key={i}>
                        <td className="line-number">{i + 1}</td>
                        <td className="line-content">{line}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
