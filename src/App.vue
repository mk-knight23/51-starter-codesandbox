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
  Command
} from 'lucide-vue-next'

const loading = ref(true)
onMounted(() => {
  setTimeout(() => loading.value = false, 1200)
})

const features = [
  { title: 'Vite 6 Engine', desc: 'Instant HMR and optimized builds for modern environments.', icon: Zap },
  { title: 'Vue 3.5+', desc: 'Composition API with the latest script setup enhancements.', icon: Box },
  { title: 'TypeScript', desc: 'End-to-end type safety for robust enterprise modules.', icon: Cpu },
  { title: 'Tailwind 3', desc: 'Utility-first styling with custom dev-centric tokens.', icon: Layers }
]
</script>

<template>
  <div class="min-h-screen bg-dev-bg">
    <!-- Navbar -->
    <nav class="h-20 border-b border-dev-border px-8 flex items-center justify-between sticky top-0 bg-dev-bg/80 backdrop-blur-md z-50">
       <div class="flex items-center space-x-3 text-white">
          <div class="bg-dev-primary p-2 rounded-xl rotate-6">
             <Code2 class="text-white" :size="24" />
          </div>
          <span class="font-display font-black text-xl tracking-tighter uppercase italic">Sandbox<span class="text-dev-primary">Kit</span></span>
       </div>

       <div class="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="#" class="hover:text-dev-primary transition-colors">Playground</a>
          <a href="#" class="hover:text-dev-primary transition-colors">Components</a>
          <a href="#" class="hover:text-dev-primary transition-colors">Docs</a>
       </div>

       <div class="flex items-center space-x-4">
          <a href="https://github.com/mk-knight23/54-CodeSandbox-Starter-Kit" target="_blank" class="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
             <Github :size="20" />
          </a>
          <button class="bg-white text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-dev-primary hover:text-white transition-all">
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
            <h2 class="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase text-white">
               The Base for <br />
               <span class="bg-clip-text text-transparent bg-gradient-to-r from-dev-primary to-dev-accent italic font-light">Rapid</span> <br />
               Production.
            </h2>
            <p class="text-xl text-slate-500 font-medium leading-relaxed max-w-lg italic">
              A high-fidelity starter kit optimized for developer speed and modular architecture.
            </p>
            <div class="flex flex-wrap gap-4 pt-4">
               <button class="bg-dev-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center group shadow-xl shadow-dev-primary/20 active:scale-95 transition-all">
                  Launch Console <ChevronRight class="ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
               <button class="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-white">
                  Read Manifesto
               </button>
            </div>
         </div>

         <div class="relative group">
            <div class="absolute inset-0 bg-dev-primary/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            <div class="relative glass-card p-2">
               <div class="bg-slate-900 rounded-[1.2rem] overflow-hidden">
                  <!-- Mock Terminal -->
                  <div class="h-10 bg-slate-800 px-4 flex items-center justify-between">
                     <div class="flex space-x-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                     </div>
                     <span class="text-[10px] font-mono text-slate-500">sandbox@dev-env: ~</span>
                     <div class="w-6"></div>
                  </div>
                  <div class="p-8 font-mono text-sm space-y-4">
                     <p class="text-dev-primary">$ npm run dev</p>
                     <p class="text-slate-400 italic">> codesandbox-starter@2.0.0 dev</p>
                     <p class="text-slate-400 italic">> vite</p>
                     <p class="text-emerald-500">✓ ready in 148ms</p>
                     <div class="pt-4 flex items-center space-x-2">
                        <span class="text-dev-accent">➜</span>
                        <span class="text-white">Local:</span>
                        <span class="text-dev-primary underline underline-offset-4 cursor-pointer">http://localhost:5173/</span>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Floating Accessory -->
            <div class="absolute -bottom-8 -right-8 glass-card p-6 flex items-center space-x-4 animate-bounce" style="animation-duration: 3s">
               <div class="p-3 bg-dev-accent/20 rounded-xl text-dev-accent">
                  <Sparkles :size="20" />
               </div>
               <div>
                  <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">DX Score</p>
                  <p class="text-xl font-black text-white">99.8</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Features Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-40">
         <div v-for="feat in features" :key="feat.title" class="glass-card p-10 space-y-8 group hover:border-dev-primary transition-all duration-500">
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-dev-primary group-hover:bg-dev-primary/10 transition-all duration-500">
               <component :is="feat.icon" :size="28" stroke-width="1.5" />
            </div>
            <div class="space-y-3">
               <h4 class="text-xl font-display font-bold uppercase tracking-tight text-white">{{ feat.title }}</h4>
               <p class="text-sm text-slate-500 leading-relaxed font-medium italic">{{ feat.desc }}</p>
            </div>
         </div>
      </section>

    </main>

    <!-- Global Footer -->
    <footer class="py-20 px-10 border-t border-dev-border">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div class="flex items-center space-x-4">
             <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                <Command :size="16" class="text-slate-500" />
             </div>
             <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Architected for Scalability</p>
          </div>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 italic">© 2026 Sandbox Systems. All rights reserved.</p>
       </div>
    </footer>

  </div>
</template>
