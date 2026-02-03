<script setup lang="ts">
import { useAnalyticsStore } from '../../stores/analytics'
const analyticsStore = useAnalyticsStore()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="card p-4 text-center">
      <p class="text-2xl font-bold text-primary">{{ analyticsStore.totalRuns }}</p>
      <p class="text-sm text-slate-500">Total Runs</p>
    </div>
    <div class="card p-4 text-center">
      <p class="text-2xl font-bold text-violet">{{ analyticsStore.totalEvents }}</p>
      <p class="text-sm text-slate-500">Total Events</p>
    </div>
    <div class="card p-4 text-center">
      <p class="text-2xl font-bold text-rose-500">{{ analyticsStore.totalErrors }}</p>
      <p class="text-sm text-slate-500">Errors</p>
    </div>
    <div class="card p-4 text-center">
      <p class="text-2xl font-bold text-emerald-500">{{ Math.round(analyticsStore.totalTimeMs / 1000) }}</p>
      <p class="text-sm text-slate-500">Seconds</p>
    </div>
  </div>
</template>
