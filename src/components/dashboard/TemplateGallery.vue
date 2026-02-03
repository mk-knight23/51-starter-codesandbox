<script setup lang="ts">
const templates = [
  { id: 'vue', name: 'Vue 3', description: 'Modern Vue 3 starter', icon: '⚡' },
  { id: 'react', name: 'React', description: 'React 18 starter', icon: '⚛️' }
]
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div v-for="template in templates" :key="template.id" class="card p-4 cursor-pointer hover:border-primary transition-colors">
      <div class="text-3xl mb-2">{{ template.icon }}</div>
      <h4 class="font-semibold text-slate-900 dark:text-white">{{ template.name }}</h4>
      <p class="text-sm text-slate-500">{{ template.description }}</p>
    </div>
  </div>
</template>
