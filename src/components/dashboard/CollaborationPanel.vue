<script setup lang="ts">
// Collaboration panel - simplified version
const collaborators = [
  { id: 1, name: 'You', role: 'Owner', avatar: '👤' }
]
</script>

<template>
  <div class="card p-4">
    <h4 class="font-semibold text-slate-900 dark:text-white mb-4">Collaborators</h4>
    <div class="space-y-3">
      <div v-for="user in collaborators" :key="user.id" class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">{{ user.avatar }}</div>
        <div>
          <p class="font-medium text-slate-900 dark:text-white">{{ user.name }}</p>
          <p class="text-xs text-slate-500">{{ user.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
