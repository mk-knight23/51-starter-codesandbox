---
title: Installation & Setup
description: Learn how to install and set up your Vue 3 project
category: getting-started
---

# Installation & Setup

This guide will help you set up a new Vue 3 project using modern tools and best practices.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [VS Code](https://code.visualstudio.com/) (optional but recommended)

## Quick Start

### Create a New Project

```bash
npm create vue@latest
```

This will prompt you to configure your project with options like:

- Project name
- Add TypeScript support
- Add JSX support
- Add Vue Router
- Add Pinia
- Add Vitest
- Add End-to-End Testing Solution
- Add ESLint for code quality

### Alternative Methods

#### Using Vite Directly

```bash
npm create vite@latest my-vue-app -- --template vue-ts
```

#### Using Vue CLI

```bash
npm install -g @vue/cli
vue create my-vue-app
```

## Project Structure

Here's what a typical Vue 3 project looks like:

```
my-vue-app/
├── public/          # Static assets
├── src/             # Source code
│   ├── assets/      # Project assets
│   ├── components/  # Vue components
│   ├── composables/ # Composition API functions
│   ├── views/       # Page components
│   ├── router/      # Vue Router configuration
│   ├── stores/      # Pinia stores
│   ├── utils/       # Utility functions
│   ├── App.vue      # Root component
│   └── main.ts      # Application entry point
├── index.html       # HTML template
├── package.json     # Project dependencies
└── vite.config.ts   # Vite configuration
```

## Development Server

Start the development server:

```bash
npm run dev
```

This will start a hot-reloading development server at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

## TypeScript Support

Vue 3 has excellent TypeScript support out of the box:

### Type Definitions

```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

// components/UserCard.vue
<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{
  user: User
}>()
</script>
```

### Composables with TypeScript

```typescript
// composables/useCounter.ts
import { ref, computed, type Ref } from 'vue'

export function useCounter(initialValue: number = 0) {
  const count: Ref<number> = ref(initialValue)

  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return {
    count,
    doubled,
    increment
  }
}
```

## Essential Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "~5.3.0",
    "vite": "^5.0.0",
    "vue-tsc": "^1.8.0"
  }
}
```

## IDE Setup

### VS Code Extensions

Install these extensions for better development experience:

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier

### Settings Configuration

Create a `.vscode/settings.json`:

```json
{
  "typescript.preferences.preferTypeOnlyAutoImports": true,
  "vue.codeActions.enabled": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Environment Variables

Create a `.env.local` file for environment variables:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My Vue App
```

Use them in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure you're using Node.js 16 or higher
2. **Permissions**: Run `npm install` without `sudo`
3. **Caching**: Clear npm cache: `npm cache clean --force`

### Getting Help

- [Vue Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Forum](https://forum.vuejs.org/)
- [Vue Discord](https://discord.com/invite/vuejs)

## Next Steps

Now that you have your project set up:

1. [Learn the basics of Vue 3](./getting-started.md)
2. [Understand the Composition API](./composition-api.md)
3. [Set up routing](./routing.md)
4. [Configure state management](./state-management.md)