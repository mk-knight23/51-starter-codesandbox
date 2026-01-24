# SandboxKit - Professional Vue 3 Starter

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-fidelity, modular developer playground and starter kit built with Vue 3, TypeScript, and Tailwind CSS**

[Live Demo](https://sandboxkit.vercel.app) | [GitHub](https://github.com/mk-knight23/54-CodeSandbox-Starter-Kit)

</div>

---

## Overview

SandboxKit provides a production-ready foundation for new projects. It replaces generic templates with an opinionated environment focusing on developer experience (DX), performance, and modularity.

### Problem Statement

Legacy starter kits often suffer from:
- Outdated tooling and dependencies
- No standardized architecture
- Poor developer experience
- Limited theming support

### Solution

SandboxKit provides:
- **Modern Tooling**: Vite 6 + Vue 3.5+ with Composition API
- **Theme System**: Dark/Light mode with persistence
- **Type Safety**: Full TypeScript strict mode
- **Developer Experience**: Mock terminal UI and instant feedback

---

## Features Comparison

| Feature | Legacy Version | SandboxKit (v2.0) |
| :--- | :--- | :--- |
| **Framework** | Vue 2/3 Basic | **Vue 3.5+ (Composition API)** |
| **Tooling** | Standard Vite | **Vite 6 + TS Optimized Pipeline** |
| **Theme** | Dark only | **Dark + Light mode with persistence** |
| **Icons** | Basic | **Lucide Vue with dark/light variants** |
| **Accessibility** | Minimal | **ARIA labels, keyboard navigation** |
| **State** | None | **VueUse composables ready** |

---

## Tech Stack

- **Framework**: Vue 3.5+ (Script Setup)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3.4
- **Utilities**: @vueuse/core
- **Icons**: Lucide Vue
- **TypeScript**: 5.9+ with strict mode

---

## Architecture

```
src/
├── App.vue                 # Root component with theme
├── main.ts                 # App entry point
└── style.css               # Global styles & theme
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/54-CodeSandbox-Starter-Kit.git
cd 54-CodeSandbox-Starter-Kit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Generates optimized production bundles.

---

## Theme System

SandboxKit includes a fully-featured dark/light mode with:

- **System Detection**: Auto-detects OS preference
- **Manual Toggle**: Switch via navbar button
- **Persistence**: Preference saved in localStorage
- **Smooth Transitions**: 300ms CSS transitions

---

## Accessibility

The starter kit includes comprehensive accessibility features:

- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant

---

## Deployment

Compatible with any modern static hosting:

- **Vercel**: `npx vercel --prod`
- **Netlify**: Connect repository
- **GitHub Pages**: `npm run preview` then deploy dist/

```bash
# Deploy to Vercel
npx vercel --prod --name sandboxkit

# Preview production build
npm run preview
```

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with Vue 3 + Vite + Tailwind CSS**

</div>
