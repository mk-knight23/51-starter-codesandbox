# Architecture | SYSTEM.HUD Vue Starter

## Overview

SYSTEM.HUD is a Vue 3.5+ starter kit with a sci-fi interface aesthetic. It provides a production-ready foundation with modern tooling and modular architecture.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3.5+ (Composition API) |
| Build | Vite 7 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| State | Pinia 3.x |
| Routing | Vue Router 4.x |
| Utilities | @vueuse/core |
| Icons | Lucide Vue Next |

## Directory Structure

```
src/
├── assets/           # Static assets
├── components/
│   └── ui/          # Reusable UI components
├── composables/     # Vue composables (logic reuse)
│   ├── useAudio.ts
│   └── useKeyboardControls.ts
├── features/        # Feature modules
├── stores/          # Pinia stores
│   ├── settings.ts  # Theme & UI preferences
│   └── stats.ts     # Analytics & metrics
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
│   └── constants.ts
├── App.vue          # Root component
├── main.ts          # Entry point
└── style.css        # Tailwind v4 + HUD theme
```

## State Management

### Settings Store (`stores/settings.ts`)

Manages user preferences:
- Theme mode (light/dark/system)
- Sound effects toggle
- Animations toggle
- Reduced motion preference

```typescript
const settingsStore = useSettingsStore()
settingsStore.isDarkMode // Computed based on theme + system preference
settingsStore.toggleTheme()
```

### Stats Store (`stores/stats.ts`)

Tracks usage analytics:
- Page visits
- Theme switches
- Settings panel opens
- Click events

## Composables

### useAudio (`composables/useAudio.ts`)

Handles UI sound effects:
- Click sounds
- Toggle sounds
- Audio state management

### useKeyboardControls (`composables/useKeyboardControls.ts`)

Global keyboard shortcuts:
- `Ctrl/Cmd + K` - Command palette
- `Esc` - Close modals
- Custom hotkeys

## Tailwind v4 Configuration

No `tailwind.config.js` needed. Theme defined in CSS:

```css
@theme {
  --color-hud-cyan: #00f0ff;
  --color-hud-cyan-dim: #00a0b0;
  --color-hud-bg: #030814;
  /* ... more tokens */
}
```

## Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── favicon.svg
```

## Development

```bash
# Start dev server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance

- **Vite:** Instant HMR, optimized builds
- **Tailwind v4:** Zero-runtime CSS
- **Vue 3.5:** Improved reactivity performance
- **Lazy loading:** Components loaded on demand

## Deployment

Compatible with:
- Vercel (zero config)
- Netlify (zero config)
- GitHub Pages (build to `dist/`)
- Any static host

```bash
npm run build
# Deploy dist/ folder
```
