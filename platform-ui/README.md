# LONGRISE Unified PC and Mobile UI Mockup

This project is a serverless visual and interaction mockup for the LONGRISE platform.

- Desktop visitors see the existing LONGRISE PC landing page before login.
- Viewports below 1024px load the Mobile V15 React layout from the same Vite application.
- PC and mobile preserve their approved layouts while sharing one build, one dependency set, and common design tokens.
- The phone preview in the desktop technology section renders the same mobile React source with `?preview=mobile`.
- The mobile preview is mounted only when its desktop section approaches the viewport.
- Only English is active. Seven additional languages are shown as disabled `Coming Soon` options.
- All account, wallet, transaction, and support data is local mock data.
- No API key, production wallet, blockchain node, database, or backend server is connected.

Shared visual rules extracted from the original PC source are documented in `LONGRISE_UI_DESIGN_GUIDE.md`.

## Source structure

```text
src/
  main.tsx             # Selects the PC or mobile entry module
  desktop-entry.tsx    # PC application entry
  mobile-entry.jsx     # Mobile application entry
  App.tsx              # Approved PC layout
  mobile/              # Mobile V15 React source, styles, fonts, and rank assets
  shared/              # Shared mock data and types
  styles/tokens.css    # Shared LONGRISE design tokens
```

Do not create or publish a separate standalone mobile HTML file. Both layouts are built from the root `index.html`.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The default is `http://127.0.0.1:3000/` when that port is available.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The static deployment files are generated in `dist/`. PC and mobile are code-split into separate entry chunks, so each viewport downloads only the layout it uses. The Vite base path is relative so the build can be hosted under a GitHub Pages repository subpath.

## Mock login

Enter any valid email address and a password of at least six characters. Authentication is simulated locally and no credentials are transmitted.
