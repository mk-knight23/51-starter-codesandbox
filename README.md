# SandboxKit - Professional Vue 3 Starter

A high-fidelity, modular developer playground and starter kit built with **Vue 3**, **TypeScript**, and **Tailwind CSS**. Designed for rapid prototyping and clean architecture seeding.

## Overview
SandboxKit provides a production-ready foundation for new projects. It replaces generic templates with an opinionated environment focusing on developer experience (DX), performance, and modularity.

## Features Comparison

| Feature | Legacy Version | SandboxKit (v2.0) |
| :--- | :--- | :--- |
| **Framework** | Vue 2/3 Basic | **Vue 3.5+ (Composition API)** |
| **Tooling** | Standard Vite | **Vite 6 + TS Optimized Pipeline** |
| **Design** | Basic CSS | **Tailwind CSS 3 (IDE Dark Theme)** |
| **State** | None | **Pinia Store Example Architecture** |
| **DX** | Minimal | **Interactive Component Demos & Mock IDE UI** |
| **Performance**| Moderate | **Critical-path optimization & Tree-shaking** |

## Tech Stack
- **Framework:** Vue 3.5 (Script Setup)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (Developer palette)
- **State Management:** Pinia
- **Icons:** Lucide Vue
- **Utilities:** @vueuse/core

## Project Structure
```text
src/
├── components/ui/      # Atomic, reusable design elements
├── features/           # Domain-specific modules (Playground, Auth)
├── stores/             # Centralized Pinia state examples
└── composables/        # Shared reactive logic
```

## Setup & Build Instructions

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Deployment
Compatible with any modern static hosting provider. Includes optimized bundle splitting for rapid edge delivery.

---

**License:** MIT
**Architect:** mk-knight23
