<script setup lang="ts">
/**
 * Vue 3 Playground - Learn by Doing!
 *
 * Welcome to your interactive Vue 3 learning playground.
 * Follow the numbered steps to master Vue fundamentals.
 */
import { ref, computed, watch, onMounted } from 'vue'
import { Beaker, BookOpen, Github, ExternalLink } from 'lucide-vue-next'
import CounterDemo from './components/playground/CounterDemo.vue'
import TodoDemo from './components/playground/TodoDemo.vue'
import ThemeDemo from './components/playground/ThemeDemo.vue'
import InteractivePlayground from './components/playground/InteractivePlayground.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useThemeStore } from './stores/theme'

const currentStep = ref(1)
const themeStore = useThemeStore()

// Initialize theme on app mount
onMounted(() => {
  themeStore.initializeTheme()
})

const steps = [
  { id: 1, title: 'Reactive State', component: CounterDemo, gradient: 'step-gradient-1', icon: '01' },
  { id: 2, title: 'Todo List', component: TodoDemo, gradient: 'step-gradient-2', icon: '02' },
  { id: 3, title: 'Pinia Store', component: ThemeDemo, gradient: 'step-gradient-3', icon: '03' },
  { id: 4, title: 'Interactive Playground', component: InteractivePlayground, gradient: 'step-gradient-4', icon: '04' }
]

const currentStepData = computed(() => steps[currentStep.value - 1])

function goToStep(stepId: number) {
  currentStep.value = stepId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function nextStep() {
  if (currentStep.value < steps.length) {
    goToStep(currentStep.value + 1)
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    goToStep(currentStep.value - 1)
  }
}

// Ensure currentStep is always valid
if (import.meta.env.DEV) {
  watch(currentStep, (newVal) => {
    if (newVal < 1 || newVal > steps.length) {
      console.warn(`Invalid step: ${newVal}. Resetting to 1.`)
      currentStep.value = 1
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet flex items-center justify-center shadow-lg shadow-primary/25">
              <Beaker class="text-white" :size="20" />
            </div>
            <div>
              <h1 class="text-lg font-bold text-slate-900 dark:text-white">Vue 3 Playground</h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">Learn by Doing</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            <button
              v-for="step in steps"
              :key="step.id"
              @click="goToStep(step.id)"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="currentStep === step.id
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            >
              <span
                class="w-5 h-5 rounded-md text-xs font-bold flex items-center justify-center"
                :class="currentStep === step.id ? step.gradient + ' text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'"
              >
                {{ currentStep > step.id ? '✓' : step.id }}
              </span>
              <span class="hidden lg:inline">{{ step.title }}</span>
            </button>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <a href="https://vuejs.org/guide/introduction.html" target="_blank" class="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
              <BookOpen :size="16" />
              <span>Docs</span>
            </a>
            <a href="https://github.com/vuejs/core" target="_blank" class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
              <Github :size="16" />
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Stepper -->
      <div class="md:hidden border-t border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between px-4 py-3">
          <button
            @click="prevStep"
            :disabled="currentStep === 1"
            class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <div class="flex items-center gap-2">
            <span
              v-for="step in steps"
              :key="step.id"
              class="w-2.5 h-2.5 rounded-full transition-all duration-200"
              :class="currentStep === step.id ? step.gradient : 'bg-slate-300 dark:bg-slate-600'"
            />
          </div>
          <button
            @click="nextStep"
            :disabled="currentStep === steps.length"
            class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Step Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
              Step {{ currentStep }} of {{ steps.length }}
            </div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">{{ currentStepData!.title }}</h2>
          </div>
          <div class="hidden sm:flex items-center gap-3">
            <button
              @click="prevStep"
              :disabled="currentStep === 1"
              class="btn-secondary"
              :class="{ 'opacity-50 cursor-not-allowed': currentStep === 1 }"
            >
              ← Previous
            </button>
            <button
              @click="nextStep"
              :disabled="currentStep === steps.length"
              class="btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed': currentStep === steps.length }"
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>

      <!-- Demo Component -->
      <div class="mb-8">
        <component :is="currentStepData!.component" />
      </div>

      <!-- Quick Tips -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Tips Card -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Quick Tips</h3>
          </div>

          <div v-if="currentStep === 1" class="space-y-3">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Understanding Ref</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-xs">ref()</code> creates a reactive wrapper around a value. Access the actual value with <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-xs">.value</code> in JavaScript, but Vue automatically unwraps it in templates!
              </p>
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-3">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">List Rendering</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Use <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-xs">v-for</code> to render lists. Always provide a unique <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-xs">:key</code> to help Vue track changes efficiently.
              </p>
            </div>
          </div>

          <div v-if="currentStep === 3" class="space-y-3">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Pinia Stores</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Stores are global reactive state containers. Define state with <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-xs">ref()</code>, actions as regular functions, and access everything through the store instance.
              </p>
            </div>
          </div>

          <div v-if="currentStep === 4" class="space-y-3">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Experiment Freely</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The playground is your sandbox! Modify values, see instant results, and learn by experimentation. Nothing can break - just hit Reset!
              </p>
            </div>
          </div>
        </div>

        <!-- Resources Card -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen class="w-5 h-5 text-primary" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Learning Resources</h3>
          </div>

          <div class="space-y-3">
            <a href="https://vuejs.org/guide/introduction.html" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all group">
              <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl">
                📖
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Official Vue 3 Docs</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400">Comprehensive guide to Vue 3</p>
              </div>
              <ExternalLink class="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </a>

            <a href="https://vuejs.org/examples/" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all group">
              <div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl">
                💻
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Vue Examples</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400">Interactive examples</p>
              </div>
              <ExternalLink class="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </a>

            <a href="https://pinia.vuejs.org/" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all group">
              <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl">
                🗃️
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Pinia Docs</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400">State management guide</p>
              </div>
              <ExternalLink class="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Built with <span class="text-rose-500">❤</span> using Vue 3 + TypeScript + Vite
          </p>
          <div class="flex items-center gap-6">
            <a href="https://github.com/vuejs/core" target="_blank" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Vue GitHub</a>
            <a href="https://vitejs.dev" target="_blank" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Vite</a>
            <a href="https://tailwindcss.com" target="_blank" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Tailwind</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import './index.css';
</style>
