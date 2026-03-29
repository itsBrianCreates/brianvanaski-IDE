# Brian Vanaski Portfolio v2

Personal portfolio website styled as a VS Code/Cursor code editor. Built with React + Vite, hosted on GitHub Pages.

## Architecture

Single-page app where the "files" in a file tree are pages of content. All content lives in markdown files under `src/content/`. The file tree structure is defined in `src/fileTree.js` — to add a new page, create the `.md` file, import it, and add it to both `fileTree` and `contentMap`.

## Key Files

- `src/fileTree.js` — single source of truth for site structure and content imports
- `src/App.css` — all styles, CSS variables for theming
- `src/components/` — FileTree, TabBar, ContentPanel, StatusBar, MobileSidebar, Toast
- `src/content/` — all markdown content organized by folder

## Design System

The design system is documented in `src/content/design-system/` and visible to site visitors. Follow it when making changes.

### Colors

Use CSS variables defined in `App.css`. Never use raw hex values in components.

- **Accent:** `#FFD60A` (Apple system yellow) — `var(--accent)`
- **Dark theme editor bg:** `#111111` — near-black canvas
- **Dark theme sidebar:** `#1a1a1a` — slightly lighter than canvas
- **Body text:** `#e6e6e6` (~90% white) — `var(--text-body)`
- **Headings:** `#ffffff` — `var(--text-heading)`
- **Muted text:** `#808080` — `var(--text-muted)`

Active/selected states use the accent yellow. Buttons with yellow background get dark text (`#1e1e1e`), not white.

### Spacing

Base unit is 4px. Use multiples: 4, 8, 12, 16, 24, 32, 48. No odd values, no 10px, no 15px.

### Typography

- **UI chrome** (file tree, tabs, status bar, code view): JetBrains Mono
- **Content preview**: system sans-serif stack
- Never use Inter, Roboto, or Arial

### Icons

Use `lucide-react` for all icons. Currently using: FolderClosed, FolderOpen, FileText, Share, Check.

## Conventions

- Dark mode is the default and primary theme
- All new CSS uses existing CSS variables — don't introduce new color values without adding them to the variable block
- Animations should respect `prefers-reduced-motion`
- File tree items show a share icon on hover that copies the URL
- Hash-based routing: `/#/path/to/file` — every page is shareable
- Open tabs and theme preference persist to localStorage

## Adding a New Page

1. Create `src/content/your-folder/your-page.md`
2. In `src/fileTree.js`: import it with `?raw` suffix
3. Add entry to `fileTree` array (in a folder or at root)
4. Add entry to `contentMap` with the path as key
5. That's it — routing, tabs, and share links work automatically

## Dev

```
npm run dev     # Start dev server
npm run build   # Build for production
```
