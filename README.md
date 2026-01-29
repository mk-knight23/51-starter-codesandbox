# SYSTEM.HUD | Vue 3 Sci-Fi Interface Starter

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A futuristic sci-fi HUD-style interface starter kit built with Vue 3, TypeScript, and Tailwind CSS v4**

[Live Demo](https://sandboxkit.vercel.app) | [GitHub](https://github.com/mk-knight23/51-starter-codesandbox)

</div>

---

## Theme: Futuristic / Sci-Fi HUD

This starter kit features a cyberpunk-inspired heads-up display aesthetic with:
- **Cyan neon color palette** (`#00f0ff`) as primary accent
- **Glassmorphism panels** with backdrop blur and subtle borders
- **Animated scanlines** and grid overlays
- **Data visualization** components (metrics, progress bars, status indicators)
- **Monospace typography** for technical feel
- **Glow effects** and hover interactions

---

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **State**: Pinia 3.x
- **Routing**: Vue Router 4.x
- **Utilities**: @vueuse/core
- **Icons**: Lucide Vue Next
- **TypeScript**: 5.9+ with strict mode

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## HUD Theme Components

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-hud-cyan` | `#00f0ff` | Primary accent, text glow |
| `--color-hud-cyan-dim` | `#00a0b0` | Secondary text, labels |
| `--color-hud-blue` | `#0066ff` | Secondary accent |
| `--color-hud-purple` | `#a855f7` | Highlights, special metrics |
| `--color-hud-green` | `#00ff88` | Status: online, success |
| `--color-hud-orange` | `#ff6b00` | Status: warning |
| `--color-hud-red` | `#ff3366` | Status: error |
| `--color-hud-bg` | `#030814` | Background |
| `--color-hud-panel` | `rgba(0, 20, 40, 0.7)` | Panel backgrounds |
| `--color-hud-border` | `rgba(0, 240, 255, 0.2)` | Border accents |

### Available Classes

```css
.hud-container       /* Main wrapper with scanline effect */
.hud-panel           /* Glassmorphism card */
.hud-button          /* Neon button with glow */
.hud-card            /* Interactive card with hover effects */
.hud-metric          /* Large metric display */
.hud-label           /* Small monospace label */
.hud-grid-overlay    /* Background grid pattern */
.hud-scanline        /* Animated scanline effect */
```

### Animations

```css
.animate-hud-pulse   /* Subtle pulse effect */
.animate-hud-scan    /* Vertical scanline */
.animate-hud-glitch  /* Glitch effect on hover */
.animate-hud-blink   /* Terminal cursor blink */
```

---

## Project Structure

```
src/
├── components/
│   └── ui/
│       └── SettingsPanel.vue
├── composables/
│   ├── useAudio.ts
│   └── useKeyboardControls.ts
├── stores/
│   ├── settings.ts
│   └── stats.ts
├── utils/
│   └── constants.ts
├── App.vue           # Main HUD interface
├── main.ts
└── style.css         # Tailwind v4 + HUD theme
```

---

## Deployment

Deployed to **Vercel** with zero-config. Push to main branch for automatic deployment.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Compatible with Vercel, Netlify, and GitHub Pages.

---

<div align="center">

**SYSTEM.HUD v2.0** // ALL SYSTEMS OPERATIONAL

</div>
