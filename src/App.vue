<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Code2,
  Box,
  Zap,
  Github,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
  Command,
  Sun,
  Moon
} from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'

const loading = ref(true)
onMounted(() => {
  setTimeout(() => loading.value = false, 1200)
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const features = [
  { title: 'Vite 6 Engine', desc: 'Instant HMR and optimized builds for modern environments.', icon: Zap },
  { title: 'Vue 3.5+', desc: 'Composition API with the latest script setup enhancements.', icon: Box },
  { title: 'TypeScript', desc: 'End-to-end type safety for robust enterprise modules.', icon: Cpu },
  { title: 'Tailwind 3', desc: 'Utility-first styling with custom dev-centric tokens.', icon: Layers }
]
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDark ? 'bg-dev-bg' : 'bg-slate-50'">
    <!-- Navbar -->
    <nav
      class="h-20 border-b px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md transition-colors duration-300"
      :class="isDark ? 'border-dev-border bg-dev-bg/80' : 'border-slate-200 bg-white/80'"
    >
       <div class="flex items-center space-x-3" :class="isDark ? 'text-white' : 'text-slate-900'">
          <div class="bg-dev-primary p-2 rounded-xl rotate-6">
             <Code2 class="text-white" :size="24" />
          </div>
          <span class="font-display font-black text-xl tracking-tighter uppercase italic">Sandbox<span class="text-dev-primary">Kit</span></span>
       </div>

       <div class="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="isDark ? 'text-slate-400' : 'text-slate-500'">
          <a href="#" class="hover:text-dev-primary transition-colors">Playground</a>
          <a href="#" class="hover:text-dev-primary transition-colors">Components</a>
          <a href="#" class="hover:text-dev-primary transition-colors">Docs</a>
       </div>

       <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleDark()"
            class="p-2.5 rounded-xl transition-colors"
            :class="isDark ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="!isDark" :size="20" />
            <Moon v-else :size="20" class="text-amber-400" />
          </button>

          <a
            href="https://github.com/mk-knight23/54-CodeSandbox-Starter-Kit"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2.5 rounded-xl transition-colors"
            :class="isDark ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'"
            aria-label="View source on GitHub"
          >
             <Github :size="20" />
          </a>
          <button
            class="px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
            :class="isDark ? 'bg-white text-black hover:bg-dev-primary hover:text-white' : 'bg-slate-900 text-white hover:bg-dev-primary'"
          >
             Fork Template
          </button>
       </div>
    </nav>

    <main class="max-w-7xl mx-auto px-10 py-20 space-y-24">

      <!-- Hero -->
      <section class="grid lg:grid-cols-2 gap-20 items-center">
         <div class="space-y-10">
            <div class="inline-flex items-center space-x-3 px-4 py-1 rounded-full bg-dev-primary/10 border border-dev-primary/20">
               <span class="w-1.5 h-1.5 bg-dev-primary rounded-full animate-pulse"></span>
               <span class="text-[10px] font-black uppercase tracking-[0.2em] text-dev-primary">v2.0 Performance Revision</span>
            </div>
            <h2 class="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-300" :class="isDark ? 'text-white' : 'text-slate-900'">
               The Base for <br />
               <span class="bg-clip-text text-transparent bg-gradient-to-r from-dev-primary to-dev-accent italic font-light">Rapid</span> <br />
               Production.
            </h2>
            <p class="text-xl leading-relaxed max-w-lg font-medium italic transition-colors duration-300" :class="isDark ? 'text-slate-500' : 'text-slate-500'">
              A high-fidelity starter kit optimized for developer speed and modular architecture.
            </p>
            <div class="flex flex-wrap gap-4 pt-4">
               <button
                 class="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center group shadow-xl shadow-dev-primary/20 active:scale-95 transition-all"
                 :class="isDark ? 'bg-dev-primary text-white' : 'bg-slate-900 text-white'"
               >
                  Launch Console <ChevronRight class="ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
               <button
                 class="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border"
                 :class="isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'"
               >
                  Read Manifesto
               </button>
            </div>
         </div>

         <div class="relative group">
            <div class="absolute inset-0 bg-dev-primary/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            <div class="relative glass-card p-2" :class="isDark ? '' : 'bg-white border border-slate-200'">
               <div
                 class="rounded-[1.2rem] overflow-hidden transition-colors duration-300"
                 :class="isDark ? 'bg-slate-900' : 'bg-slate-100'"
               >
                  <!-- Mock Terminal -->
                  <div
                    class="h-10 px-4 flex items-center justify-between transition-colors duration-300"
                    :class="isDark ? 'bg-slate-800' : 'bg-slate-200'"
                  >
                     <div class="flex space-x-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                     </div>
                     <span class="text-[10px] font-mono text-slate-500">sandbox@dev-env: ~</span>
                     <div class="w-6"></div>
                  </div>
                  <div class="p-8 font-mono text-sm space-y-4 transition-colors duration-300" :class="isDark ? '' : 'bg-white'">
                     <p class="text-dev-primary">$ npm run dev</p>
                     <p class="italic transition-colors duration-300" :class="isDark ? 'text-slate-400' : 'text-slate-600'">> codesandbox-starter@2.0.0 dev</p>
                     <p class="italic transition-colors duration-300" :class="isDark ? 'text-slate-400' : 'text-slate-600'">> vite</p>
                     <p class="text-emerald-500">&#10003; ready in 148ms</p>
                     <div class="pt-4 flex items-center space-x-2">
                        <span class="text-dev-accent">&#10145;</span>
                        <span class="transition-colors duration-300" :class="isDark ? 'text-white' : 'text-slate-900'">Local:</span>
                        <span class="text-dev-primary underline underline-offset-4 cursor-pointer">http://localhost:5173/</span>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Floating Accessory -->
            <div class="absolute -bottom-8 -right-8 glass-card p-6 flex items-center space-x-4 animate-bounce" style="animation-duration: 3s" :class="isDark ? '' : 'bg-white border border-slate-200'">
               <div class="p-3 bg-dev-accent/20 rounded-xl text-dev-accent">
                  <Sparkles :size="20" />
               </div>
               <div>
                  <p class="text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="isDark ? 'text-slate-400' : 'text-slate-500'">DX Score</p>
                  <p class="text-xl font-black transition-colors duration-300" :class="isDark ? 'text-white' : 'text-slate-900'">99.8</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Features Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-40" role="list" aria-label="Features">
         <div
           v-for="feat in features"
           :key="feat.title"
           class="glass-card p-10 space-y-8 group hover:border-dev-primary transition-all duration-500"
           :class="isDark ? '' : 'bg-white border border-slate-200'"
           role="listitem"
         >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
              :class="isDark ? 'bg-white/5 text-slate-400 group-hover:text-dev-primary group-hover:bg-dev-primary/10' : 'bg-slate-100 text-slate-500 group-hover:text-dev-primary group-hover:bg-dev-primary/10'"
            >
               <component :is="feat.icon" :size="28" stroke-width="1.5" />
            </div>
            <div class="space-y-3">
               <h4 class="text-xl font-display font-bold uppercase tracking-tight transition-colors duration-300" :class="isDark ? 'text-white' : 'text-slate-900'">{{ feat.title }}</h4>
               <p class="text-sm leading-relaxed font-medium italic transition-colors duration-300" :class="isDark ? 'text-slate-500' : 'text-slate-500'">{{ feat.desc }}</p>
            </div>
         </div>
      </section>

    </main>

    <!-- Global Footer -->
    <footer
      class="py-20 px-10 border-t transition-colors duration-300"
      :class="isDark ? 'border-dev-border' : 'border-slate-200'"
    >
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div class="flex items-center space-x-4">
             <div
               class="w-8 h-8 rounded flex items-center justify-center transition-colors duration-300"
               :class="isDark ? 'bg-slate-800' : 'bg-slate-200'"
             >
                <Command :size="16" class="transition-colors duration-300" :class="isDark ? 'text-slate-500' : 'text-slate-400'" />
             </div>
             <p class="text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-300" :class="isDark ? 'text-slate-600' : 'text-slate-400'">Architected for Scalability</p>
          </div>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] italic transition-colors duration-300" :class="isDark ? 'text-slate-700' : 'text-slate-400'">
            &#169; 2026 Sandbox Systems. All rights reserved.
          </p>
       </div>
    </footer>

  </div>
</template>
