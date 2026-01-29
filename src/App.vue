<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Cpu,
  Zap,
  Github,
  Layers,
  ChevronRight,
  Sparkles,
  Command,
  Settings,
  Activity,
  Target,
  Radar,
  Terminal
} from 'lucide-vue-next'
import { useSettingsStore } from './stores/settings'
import { useStatsStore } from './stores/stats'
import { audioService } from './composables/useAudio'
import { useKeyboardControls } from './composables/useKeyboardControls'
import SettingsPanel from './components/ui/SettingsPanel.vue'

const loading = ref(true)
const showSettings = ref(false)

const settingsStore = useSettingsStore()
const statsStore = useStatsStore()

onMounted(() => {
  setTimeout(() => loading.value = false, 1200)
  settingsStore.loadSettings()
  statsStore.loadStats()
  statsStore.recordVisit()
})

function toggleTheme(): void {
  audioService.playClick()
  settingsStore.toggleTheme()
  statsStore.recordThemeSwitch()
}

function openSettings(): void {
  showSettings.value = true
  statsStore.recordSettingsOpen()
}

function recordClick(): void {
  statsStore.recordClick()
}

useKeyboardControls({
  onToggleTheme: toggleTheme,
  onOpenSettings: openSettings,
  onClose: () => {
    showSettings.value = false
    settingsStore.hideHelp()
  }
})

const features = [
  { title: 'Vite 7 Engine', desc: 'Next-gen HMR with instant server startup.', icon: Zap, metric: '148ms' },
  { title: 'Vue 3.5+', desc: 'Reactive system with composition API power.', icon: Cpu, metric: '99.9%' },
  { title: 'TypeScript 5', desc: 'End-to-end type safety for production.', icon: Layers, metric: '100%' },
  { title: 'Tailwind v4', desc: 'Utility-first CSS with zero-runtime.', icon: Target, metric: '0kb' }
]

const metrics = [
  { label: 'CPU Load', value: '12.4', unit: '%', icon: Activity },
  { label: 'Memory', value: '2.4', unit: 'GB', icon: Cpu },
  { label: 'Network', value: '854', unit: 'Mb/s', icon: Radar },
  { label: 'Uptime', value: '99.9', unit: '%', icon: Zap }
]
</script>

<template>
  <div class="hud-container min-h-screen flex flex-col hud-scanline">
    <div class="hud-grid-overlay absolute inset-0 z-0"></div>

    <!-- Navbar -->
    <nav class="relative z-20 h-16 border-b border-hud-border px-8 flex items-center justify-between sticky top-0 backdrop-blur-xl bg-hud-bg/80">
       <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-10 h-10 rounded-lg bg-hud-cyan/10 border border-hud-cyan flex items-center justify-center">
              <Terminal class="hud-icon" :size="20" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-hud-green rounded-full animate-pulse"></div>
          </div>
          <div>
            <span class="font-display font-black text-lg tracking-tight text-white">SYSTEM<span class="text-hud-cyan">.HUD</span></span>
            <p class="font-mono text-[10px] text-hud-cyan-dim tracking-widest">v2.0.4 RELEASE</p>
          </div>
       </div>

       <div class="hidden lg:flex items-center space-x-8">
          <a href="#" class="font-mono text-xs text-hud-cyan-dim hover:text-hud-cyan transition-colors tracking-wider flex items-center gap-2">
            <Radar :size="14" /> MODULES
          </a>
          <a href="#" class="font-mono text-xs text-hud-cyan-dim hover:text-hud-cyan transition-colors tracking-wider flex items-center gap-2">
            <Activity :size="14" /> METRICS
          </a>
          <a href="#" class="font-mono text-xs text-hud-cyan-dim hover:text-hud-cyan transition-colors tracking-wider flex items-center gap-2">
            <Command :size="14" /> DOCS
          </a>
       </div>

       <div class="flex items-center space-x-3">
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-hud-cyan/5 border border-hud-cyan/10">
            <div class="w-2 h-2 rounded-full bg-hud-green animate-pulse"></div>
            <span class="font-mono text-[10px] text-hud-cyan">ONLINE</span>
          </div>

          <button @click="toggleTheme(); recordClick()" class="hud-button !px-3 !py-2">
            <span v-if="settingsStore.isDarkMode">☀</span>
            <span v-else>☾</span>
          </button>

          <button @click="openSettings(); recordClick()" class="hud-button !px-3 !py-2" aria-label="Settings">
             <Settings :size="16" />
          </button>

          <a href="https://github.com" target="_blank" class="hud-button !px-3 !py-2" aria-label="GitHub">
             <Github :size="16" />
          </a>
       </div>
    </nav>

    <main class="relative z-10 max-w-7xl mx-auto px-8 py-16 space-y-20">

      <!-- Metrics Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="metric in metrics" :key="metric.label" class="hud-card">
          <div class="flex items-center justify-between mb-2">
            <component :is="metric.icon" class="hud-icon" :size="16" />
            <span class="hud-label">{{ metric.label }}</span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="hud-metric text-3xl">{{ metric.value }}</span>
            <span class="font-mono text-xs text-hud-cyan-dim">{{ metric.unit }}</span>
          </div>
          <div class="hud-progress mt-3">
            <div class="hud-progress-bar" style="width: 60%"></div>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="grid lg:grid-cols-2 gap-16 items-center">
         <div class="space-y-8">
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-hud-cyan/5 border border-hud-cyan/20">
               <div class="w-2 h-2 rounded-full bg-hud-cyan animate-pulse"></div>
               <span class="font-mono text-[10px] text-hud-cyan tracking-[0.2em]">SYSTEM READY</span>
            </div>

            <h2 class="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-tight">
              <span class="text-white">DEPLOY</span><br />
              <span class="text-hud-cyan hud-text-glow">FASTER</span><br />
              <span class="text-white italic font-light">THAN EVER</span>
            </h2>

            <p class="font-mono text-sm text-hud-cyan-dim max-w-md leading-relaxed">
              Initialize your next project with enterprise-grade architecture.
              Zero configuration. Maximum performance.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
                <button class="hud-button flex items-center gap-2 group" @click="recordClick()">
                  INITIALIZE <ChevronRight class="group-hover:translate-x-1 transition-transform" :size="16" />
               </button>
                <button class="px-6 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider border border-hud-cyan/20 text-hud-cyan-dim hover:text-hud-cyan hover:border-hud-cyan transition-all">
                  READ_MANIFEST
               </button>
            </div>
         </div>

         <div class="relative">
            <div class="absolute inset-0 bg-hud-cyan/5 blur-[100px] rounded-full"></div>
            <div class="relative hud-panel p-1">
               <div class="rounded-xl overflow-hidden bg-hud-bg">
                  <!-- Terminal Header -->
                  <div class="h-10 px-4 flex items-center justify-between bg-hud-cyan/5 border-b border-hud-cyan/10">
                    <div class="flex space-x-2">
                       <div class="w-3 h-3 rounded-full bg-hud-red/50"></div>
                       <div class="w-3 h-3 rounded-full bg-hud-yellow/50"></div>
                       <div class="w-3 h-3 rounded-full bg-hud-green/50"></div>
                    </div>
                    <span class="font-mono text-[10px] text-hud-cyan-dim">root@sandbox:~</span>
                    <div class="w-14"></div>
                 </div>
                  <div class="p-6 font-mono text-sm space-y-3">
                     <div class="flex gap-2">
                       <span class="text-hud-green">➜</span>
                       <span class="text-hud-cyan">~</span>
                       <span class="text-white">npm create vue@latest</span>
                     </div>
                     <div class="text-hud-cyan-dim italic pl-6">Scaffolding project structure...</div>
                     <div class="text-hud-cyan-dim italic pl-6">Installing dependencies...</div>
                     <div class="flex gap-2 pl-6">
                       <span class="text-hud-green">✓</span>
                       <span class="text-hud-cyan-dim">Ready in {{ Math.floor(Math.random() * 200 + 100) }}ms</span>
                     </div>
                     <div class="pt-2 flex items-center gap-2">
                        <span class="text-hud-blue">▸</span>
                        <span class="text-white">Local:</span>
                        <span class="text-hud-cyan underline decoration-hud-cyan/50">http://localhost:5173</span>
                     </div>
                     <div class="flex gap-2 mt-4">
                       <span class="text-hud-green">➜</span>
                       <span class="text-hud-cyan">~</span>
                       <span class="animate-pulse">_</span>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Floating Metric -->
            <div class="absolute -bottom-6 -right-6 hud-card flex items-center gap-4 animate-bounce" style="animation-duration: 4s">
              <div class="p-3 rounded-lg bg-hud-purple/20 text-hud-purple">
                 <Sparkles :size="20" />
              </div>
               <div>
                  <p class="hud-label">DX SCORE</p>
                  <p class="hud-metric text-2xl text-hud-purple">99.8</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Features Grid -->
      <section class="space-y-8">
         <div class="flex items-center gap-4">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent to-hud-cyan/30"></div>
            <span class="font-mono text-xs text-hud-cyan tracking-[0.3em]">SYSTEM COMPONENTS</span>
            <div class="h-px flex-1 bg-gradient-to-l from-transparent to-hud-cyan/30"></div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="feat in features"
              :key="feat.title"
              class="hud-card group cursor-pointer"
              @click="recordClick()"
            >
               <div class="flex items-center justify-between mb-4">
                  <div class="p-3 rounded-lg bg-hud-cyan/10 text-hud-cyan group-hover:bg-hud-cyan/20 transition-colors">
                     <component :is="feat.icon" :size="24" stroke-width="1.5" />
                  </div>
                  <span class="font-mono text-xs text-hud-cyan-dim bg-hud-cyan/5 px-2 py-1 rounded">{{ feat.metric }}</span>
               </div>
               <h4 class="font-display font-bold text-lg text-white mb-2 group-hover:text-hud-cyan transition-colors">{{ feat.title }}</h4>
               <p class="font-mono text-xs text-hud-cyan-dim leading-relaxed">{{ feat.desc }}</p>
            </div>
         </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 px-8 border-t border-hud-cyan/10">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded flex items-center justify-center bg-hud-cyan/10 border border-hud-cyan/20">
                 <Command :size="14" class="text-hud-cyan" />
              </div>
              <span class="font-mono text-[10px] text-hud-cyan-dim tracking-[0.3em]">ARCHITECTED FOR SPEED</span>
           </div>
           <p class="font-mono text-[10px] text-hud-cyan-dim tracking-wider">
             © 2026 SYSTEM.HUD // ALL SYSTEMS OPERATIONAL
           </p>
        </div>
     </footer>

     <SettingsPanel v-if="showSettings" @close="showSettings = false" />
  </div>
</template>
