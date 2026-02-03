<script setup lang="ts">
import { useProjectsStore } from '../../stores/projects'
const projectsStore = useProjectsStore()
</script>

<template>
  <div class="space-y-3">
    <div v-for="project in projectsStore.recentProjects.slice(0, 5)" :key="project.id" class="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
      <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">📄</div>
      <div class="flex-1">
        <p class="font-medium text-slate-900 dark:text-white">{{ project.name }}</p>
        <p class="text-xs text-slate-500">{{ new Date(project.lastAccessed).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>
