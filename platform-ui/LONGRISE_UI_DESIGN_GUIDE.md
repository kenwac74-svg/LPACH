# LONGRISE UI Design Guide

This guide is extracted from the original PC source and includes the approved compact-radius refinement.

The canonical machine-readable tokens are in `src/styles/tokens.css`. Both PC and mobile entry points must import this file. Layout-specific styles may add tokens but must not redefine the shared `--lr-*` values.

## Typography

- Display headings and brand: `Playfair Display`, serif, weight 700-900.
- Body and controls: `Plus Jakarta Sans`, `Noto Sans`, `Inter`, sans-serif.
- Balances and numeric values: `Geist Mono`, `JetBrains Mono`, monospace.
- Uppercase labels use strong weight and wide letter spacing.

## Color

- Deep background: `#090101`.
- Original burgundy scale: `#2d0505`, `#4a0808`, `#6b0f0f`.
- Primary gold: `#eab308`; muted brand gold: `#d4af37`.
- Primary text: `#e0d8d0`; muted text: `#888888`.
- Default line: white at 10% opacity; emphasized line: gold at 30% opacity.

## Shape

- Panels and cards: 8px radius.
- Buttons, inputs and compact controls: 6px radius.
- Pills, status dots and avatars remain circular.
- Use `lr-panel`, `lr-card`, `lr-control`, `lr-tabs`, and `lr-tab`; do not restate panel geometry in page components.

## Components

- `lr-panel`: major framed section with burgundy-black translucent surface.
- `lr-card`: repeated information card with black translucent surface.
- `lr-control`: compact bordered control.
- `lr-button-primary`: original gold gradient action.
- `lr-button-login`: dark gold-outlined header action.
- `lr-tabs` and `lr-tab`: consistent segmented navigation.

## Usage Rule

New pages must use semantic LONGRISE classes for geometry and surface styling. Tailwind utilities may control layout and responsive spacing, but must not redefine shared radius, border, panel background, or primary button colors.

## Responsive Architecture

- PC and mobile use separate layout components inside one Vite application.
- Shared policy text, data models, icons, and reusable controls should move into `src/shared` as they are revised.
- A breakpoint may select a layout, but it must not redirect to a separate HTML build.
- PC-only landing content stays in the desktop layout. Logged-in features should maintain functional parity across layouts.
- Any repeated visual inconsistency must first be checked against shared tokens and semantic components before applying a page-level override.
