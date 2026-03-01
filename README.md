# 51-starter-codesandbox

# 🧪 Vue 3 Playground - Learn by Doing!

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**An interactive educational playground for learning Vue 3 fundamentals through hands-on experimentation**

[Open in CodeSandbox](https://codesandbox.io/dashboard) | [View Live Demo](https://sandboxkit.vercel.app)

</div>

---

## Theme: 🧪 Playground / Demo

This is **not** a template for production apps - it's an interactive learning environment designed to help you master Vue 3 concepts through experimentation.

**Perfect for:**
- Beginners learning Vue 3
- Tutorials and workshops
- Testing Vue features
- Quick prototyping
- Teaching demonstrations

---

## Learning Path (Follow the Steps!)

### Step 1: Reactive State
Learn how `ref()` creates reactive variables that automatically update the DOM.

**Key concepts:**
- `ref()` for reactive primitives
- `.value` to access ref values in JavaScript
- Auto-unwrapping in templates
- Computed properties with `computed()`

**Try this:**
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
function increment() {
  count.value++ // Access with .value
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

### Step 2: Todo List
Build a practical component with list rendering, forms, and events.

**Key concepts:**
- `v-for` for list rendering
- `v-model` for two-way binding
- `@submit` for form handling
- Array manipulation methods

**Try this:**
```vue
<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Vue', completed: false }
])

function addTodo(text) {
  todos.value.push({
    id: Date.now(),
    text,
    completed: false
  })
}
</script>

<template>
  <input v-model="newTodo" @keyup.enter="addTodo(newTodo)" />
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </div>
</template>
```

### Step 3: Pinia Store
Understand state management with Pinia for global application state.

**Key concepts:**
- `defineStore()` to create stores
- `ref()` for store state
- Actions to modify state
- State persistence with localStorage

**Try this:**
```typescript
// stores/settings.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light')

  function setTheme(newTheme) {
    theme.value = newTheme
  }

  return { theme, setTheme }
})
```

### Step 4: Interactive Playground
Free-form experimental area to test all concepts together.

**Experiment with:**
- Text inputs and computed properties
- Number inputs with validation
- Range sliders
- Checkboxes and toggles
- Color pickers
- All reactive properties update in real-time!

---

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **Build Tool**: Vite 7 (instant HMR)
- **Styling**: Tailwind CSS v4 (utility-first)
- **State**: Pinia 3.x (global state)
- **TypeScript**: 5.9+ (type safety)
- **Icons**: Lucide Vue Next

---

## Quick Start

### In CodeSandbox (Recommended)
1. Click "Open in CodeSandbox"
2. Start experimenting immediately!
3. No installation required

### Locally
```bash
# Clone the repository
git clone <your-repo-url>
cd 51-starter-codesandbox

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Code Examples

### Creating a Reactive Variable
```typescript
import { ref } from 'vue'

// Primitive value
const count = ref(0)

// Access value
console.log(count.value) // 0

// Modify value
count.value = 1
```

### Creating a Computed Property
```typescript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// doubleCount updates automatically when count changes
```

### List Rendering
```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
])
</script>

<template>
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

### Event Handling
```vue
<script setup>
function handleSubmit(event) {
  event.preventDefault()
  console.log('Form submitted!')
}

function handleClick(message) {
  console.log(message)
}
</script>

<template>
  <form @submit="handleSubmit">
    <button @click="handleClick('Hello!')">Click me</button>
  </form>
</template>
```

### Using Pinia Store
```typescript
import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()

// Access state
console.log(settingsStore.theme)

// Call actions
settingsStore.setTheme('dark')
```

---

## Project Structure

```
src/
├── components/
│   └── playground/
│       ├── CounterDemo.vue           # Step 1: Reactive state
│       ├── TodoDemo.vue              # Step 2: Lists & forms
│       ├── ThemeDemo.vue             # Step 3: Pinia stores
│       └── InteractivePlayground.vue # Step 4: Free experimentation
├── stores/
│   └── settings.ts                   # Pinia store example
├── App.vue                           # Main application with step navigation
├── main.ts                           # Entry point
└── style.css                         # Global styles
```

---

## Learning Resources

- [Vue 3 Official Documentation](https://vuejs.org/guide/introduction.html)
- [Vue 3 Examples](https://vuejs.org/examples/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---



## ✨ Features

This repository has been upgraded with the following features:

1. **Add Vue 3 Composition API** ✅
2. **Implement Pinia for state** ✅
3. **Add Vue Router guards** ✅
4. **Create composables** ✅
5. **Add Teleport and Suspense** ✅
6. **Implement v-model optimization** ✅
7. **Add TypeScript support** ✅
8. **Create reusable components** ✅
9. **Add transitions and animations** ✅
10. **Implement Vitest tests** ✅

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Tech Stack

- Modern web framework
- Optimized for performance
- Responsive design
- Accessibility ready

## 🛠️ Installation

```bash
git clone https://github.com/mk-knight23/51-starter-codesandbox.git
cd 51-starter-codesandbox
npm install
```

## 📝 License

MIT

---

*Last updated: 2026-02-26*


## 🎯 Problem Solved

This repository provides a streamlined approach to modern development needs, enabling developers to build robust applications with minimal complexity and maximum efficiency.

## 🏗️ Architecture

```
```

## 🌐 Deployment

### Live URLs

| Platform | URL |
|----------|-----|
| Vercel | [Deployed Link] |
| GitHub Pages | [Deployed Link] |


## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ by mk-knight23