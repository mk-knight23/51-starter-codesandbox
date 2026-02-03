<script setup lang="ts">
/**
 * STEP 1: Understanding Reactive State
 *
 * This demo shows the most fundamental Vue concept: reactive state.
 * When you change a ref's value, Vue automatically updates the DOM!
 *
 * Key concepts:
 * - ref() creates a reactive reference
 * - .value accesses/modifies the ref value
 * - Vue tracks changes and updates the view automatically
 */
import { ref, computed } from 'vue'
import { Plus, Minus, RotateCcw } from 'lucide-vue-next'

// Create a reactive variable
const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

// Computed values for derived state
const isPositive = computed(() => count.value > 0)
const isNegative = computed(() => count.value < 0)
const isZero = computed(() => count.value === 0)
</script>

<template>
  <div class="card overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary to-violet">
      <h3 class="text-lg font-bold text-white">Reactive Counter</h3>
      <button
        @click="reset"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all"
      >
        <RotateCcw :size="14" />
        Reset
      </button>
    </div>

    <!-- Content -->
    <div class="p-8 flex flex-col items-center gap-6">
      <!-- Display -->
      <div
        class="text-7xl font-bold font-mono px-12 py-8 rounded-2xl border-4 transition-all duration-300"
        :class="{
          'text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20': isPositive,
          'text-rose-600 border-rose-500 bg-rose-50 dark:bg-rose-900/20': isNegative,
          'text-primary border-primary bg-primary/5 dark:bg-primary/10': isZero
        }"
      >
        {{ count }}
      </div>

      <!-- Status -->
      <div
        class="px-4 py-2 rounded-full text-sm font-semibold"
        :class="{
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': isPositive,
          'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400': isNegative,
          'bg-primary/10 text-primary': isZero
        }"
      >
        <span v-if="isPositive">✨ Positive number</span>
        <span v-else-if="isNegative">📉 Negative number</span>
        <span v-else>🎯 Zero - try clicking!</span>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <button
          @click="decrement"
          class="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
        >
          <Minus :size="18" />
          Decrease
        </button>
        <button
          @click="increment"
          class="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Plus :size="18" />
          Increase
        </button>
      </div>

      <!-- Explanation -->
      <div class="w-full max-w-lg p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p class="font-semibold text-amber-900 dark:text-amber-400 mb-2">Try this:</p>
        <ol class="text-sm text-amber-800 dark:text-amber-300 space-y-1 list-decimal list-inside">
          <li>Click the buttons to change the count</li>
          <li>Watch the display and status update automatically</li>
          <li>Check the code comments to understand how it works</li>
          <li>Modify the initial value and see what happens!</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
