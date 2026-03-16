---
title: Getting Started with Vue 3
description: Learn the basics of Vue 3 and start building amazing applications
date: 2024-01-15
author: Vue Team
category: tutorial
tags: [vue3, beginners, javascript]
image: /images/vue3-hero.jpg
---

# Getting Started with Vue 3

Vue 3 is a progressive JavaScript framework for building user interfaces. Whether you're new to Vue or migrating from Vue 2, this guide will help you get up and running quickly.

## What is Vue 3?

Vue 3 is the latest major release of Vue.js, featuring:
- Improved Performance with the Composition API
- Better TypeScript Support
- Smaller Bundle Size
- New Reactivity System

## Installation

### Using CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

### Using npm

```bash
npm install vue
```

### Using Vite (Recommended)

```bash
npm create vue@latest
```

## Your First Vue Component

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(0)
</script>
```

## Core Concepts

### 1. The Composition API

The Composition API allows you to organize code by logical concerns rather than by component options.

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})
</script>
```

### 2. Reactivity System

Vue 3's reactivity system is based on Proxy, providing better performance and cleaner APIs.

### 3. Lifecycle Hooks

Vue 3 provides lifecycle hooks that you can use to perform actions at specific times in a component's life.

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component is mounted!')
})

onUnmounted(() => {
  console.log('Component is unmounted!')
})
</script>
```

## Next Steps

Now that you've got the basics down, explore:
- [Vue Router for navigation](/docs/routing)
- [Pinia for state management](/docs/state-management)
- [Vue DevTools for debugging](/docs/devtools)

Happy coding! 🚀